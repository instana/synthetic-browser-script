#!/usr/bin/env node

/*
 * IBM Confidential
 * PID 5737-N85, 5900-AG5
 * Copyright IBM Corp. 2022
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_URL = 'https://storage.googleapis.com/chrome-for-testing-public';
const KNOWN_GOOD_VERSIONS_URL = 'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions.json';

function detectPlatform() {
  const platform = process.platform;
  const arch = process.arch;
  
  if (platform === 'linux') return 'linux64';
  if (platform === 'darwin') return arch === 'arm64' ? 'mac-arm64' : 'mac-x64';
  if (platform === 'win32') return arch === 'x64' ? 'win64' : 'win32';
  
  throw new Error(`Unsupported platform: ${platform} (${arch})`);
}

function getCacheDir() {
  // Cache inside node_modules
  return path.join(__dirname, '..', '.chrome-cache');
}

function getDownloadUrl(platform, version, type = 'chrome') {
  const platformFolder = {
    'linux64': 'linux64',
    'mac-x64': 'mac-x64',
    'mac-arm64': 'mac-arm64',
    'win64': 'win64',
  }[platform];
  
  return `${BASE_URL}/${version}/${platformFolder}/${type}-${platformFolder}.zip`;
}

function getInstallationDir(platform, version) {
  return path.join(getCacheDir(), 'chrome', `${platform}-${version}`);
}

async function fetchLatestChromeVersion() {
  return new Promise((resolve, reject) => {
    console.log('Fetching latest Chrome version...');
    
    https.get(KNOWN_GOOD_VERSIONS_URL, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const versions = JSON.parse(data);
          const stableVersion = versions.channels.Stable.version;
          console.log(`Latest stable Chrome version: ${stableVersion}`);
          resolve(stableVersion);
        } catch (error) {
          reject(new Error(`Failed to parse version data: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Failed to fetch Chrome version: ${error.message}`));
    });
  });
}

function getVersionCacheFile() {
  return path.join(getCacheDir(), 'chrome-version.txt');
}

function saveVersion(version) {
  const cacheDir = getCacheDir();
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(getVersionCacheFile(), version, 'utf8');
}

function loadCachedVersion() {
  const versionFile = getVersionCacheFile();
  if (fs.existsSync(versionFile)) {
    return fs.readFileSync(versionFile, 'utf8').trim();
  }
  return null;
}

async function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading from: ${url}`);
    
    const file = fs.createWriteStream(outputPath);
    
    const handleResponse = (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          https.get(redirectUrl, (redirectResponse) => {
            handleDownload(redirectResponse);
          }).on('error', reject);
        } else {
          reject(new Error('Redirect without location header'));
        }
      } else {
        handleDownload(response);
      }
    };
    
    const handleDownload = (response) => {
      const totalBytes = parseInt(response.headers['content-length'] || '0', 10);
      let downloadedBytes = 0;
      
      response.on('data', (chunk) => {
        downloadedBytes += chunk.length;
        if (totalBytes > 0) {
          const progress = ((downloadedBytes / totalBytes) * 100).toFixed(2);
          process.stdout.write(`\rDownloading: ${progress}%`);
        }
      });
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('\nDownload complete');
        resolve(outputPath);
      });
      
      file.on('error', (err) => {
        fs.unlinkSync(outputPath);
        reject(err);
      });
    };
    
    https.get(url, handleResponse).on('error', (err) => {
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      reject(err);
    });
  });
}

function extractArchive(archivePath, outputDir) {
  console.log('Extracting archive...');
  
  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });
  
  const platform = process.platform;
  let unzipCommand;
  
  if (platform === 'win32') {
    unzipCommand = `powershell -command "Expand-Archive -Path '${archivePath}' -DestinationPath '${outputDir}' -Force"`;
  } else {
    unzipCommand = `unzip -q -o "${archivePath}" -d "${outputDir}"`;
  }
  
  try {
    execSync(unzipCommand, { stdio: 'inherit' });
    console.log('Extraction complete');
  } catch (error) {
    console.error('Extraction failed:', error.message);
    throw error;
  }
}

async function downloadChrome(version) {
  const platform = detectPlatform();
  const installDir = getInstallationDir(platform, version);
  
  // Check if already downloaded
  if (fs.existsSync(installDir)) {
    console.log(`Chrome ${version} already downloaded at: ${installDir}`);
    return installDir;
  }
  
  console.log(`\nDownloading Chrome ${version} for ${platform}...`);
  
  const cacheDir = getCacheDir();
  fs.mkdirSync(cacheDir, { recursive: true });
  
  // Download Chrome
  const chromeUrl = getDownloadUrl(platform, version, 'chrome');
  const chromeArchive = path.join(cacheDir, `chrome-${version}.zip`);
  
  try {
    await downloadFile(chromeUrl, chromeArchive);
    extractArchive(chromeArchive, installDir);
    fs.unlinkSync(chromeArchive);
  } catch (error) {
    console.error(`Failed to download Chrome ${version}:`, error.message);
    throw error;
  }
  
  // Download ChromeDriver
  const driverUrl = getDownloadUrl(platform, version, 'chromedriver');
  const driverArchive = path.join(cacheDir, `chromedriver-${version}.zip`);
  
  try {
    await downloadFile(driverUrl, driverArchive);
    extractArchive(driverArchive, installDir);
    fs.unlinkSync(driverArchive);
  } catch (error) {
    console.error(`Failed to download ChromeDriver ${version}:`, error.message);
    throw error;
  }
  
  console.log(`Chrome ${version} installed successfully at: ${installDir}`);
  return installDir;
}

async function main() {
  console.log('=== Chrome Browser Download Script ===\n');
  console.log('Platform:', detectPlatform());
  console.log('Cache directory:', getCacheDir());
  
  try {
    // Use Chrome version 138
    const targetVersion = '138.0.7152.0';

    // Check if we already have this version
    const cachedVersion = loadCachedVersion();

    if (cachedVersion === targetVersion) {
      console.log(`\nChrome version ${targetVersion} is already downloaded.`);
      console.log('Skipping download.');
    } else {
      console.log(`\nDownloading Chrome version: ${targetVersion}`);

      // Download the specified version
      await downloadChrome(targetVersion);

      // Save the version to cache
      saveVersion(targetVersion);
      
      console.log('\n=== Chrome downloaded successfully ===');
    }
  } catch (error) {
    console.error('\n=== Download failed ===');
    console.error(error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  downloadChrome,
  detectPlatform,
  getCacheDir,
  getInstallationDir,
  fetchLatestChromeVersion,
  loadCachedVersion
};