# Instana Synthetic Browser Script

[![Node Support](https://img.shields.io/badge/node-16.x-brightgreen.svg)](https://www.npmjs.com/package/%40instana/synthetic-browser-script)
[![Selenium Support](https://img.shields.io/badge/selenium-4.x-brightgreen.svg)](https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebDriver.html)

[![Banner](doc/imgs/sbs-banner.png)](https://pages.github.ibm.com/instana/instana-knowledge-center/synthetic-browser-testing/overview/)

#### [Homepage](https://www.ibm.com/docs/en/instana-observability/current?topic=instana-synthetic-monitoring-open-beta) &bullet; [Developer Guide](https://pages.github.ibm.com/instana/instana-knowledge-center/synthetic-browser-testing/browser_script/) &bullet; [API Reference](https://pages.github.ibm.com/instana/instana-knowledge-center/synthetic-browser-testing/browser_api_reference/) &bullet;

This is a local runner can accelerate your Synthetic browser testing on-boarding. It provides totally the same testing results as Instana Synthetic thus can save your time in developing and testing Synthetic scripts locally. As a script writer you may have following requirements:

💡 a local runner to test and debug my scripts locally with CLI<br>
💡 a npm package providing all the Instana Synthetic browser testing APIs<br>
💡 "code completion" or "code hinting" in VS Code for all the browser testing APIs<br>
💡 open full browser to perform my test actions to convince me of the quality of my scripts<br>
💡 reproduce my test failures locally to help me debug root cause<br>
💡 examples to demonstrate how to use browser testing APIs thus I can write my own ones on top of them

[Synthetic-browser-script](https://github.com/instana/synthetic-browser-script/tags) is now available in the public NPM channel.

**Supported runtime**

Chromium, Mozilla Firefox, Node.js runtime.

☑️ Google Chrome / Chromium<br>
☑️ Mozilla Firefox<br>
☑️ Node.js v16.x<br>
☑️ selenium-webdriver v4.0.0


## 🍀 Pre-requisite

#### 1. Install Node.js Server

You can use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to install Node.js if you don't have one.

Node.js v16 is recommended. 

```bash
nvm install 16.15.1

node --version
v16.15.1
```
#### 2. Install Browser Drivers

All the driver implementations are provided by the browser vendors themselves.
Make sure you get the correct version of driver for your browser. 
To quick start, you only need to install latest Chrome driver. Firefox is optional.

* **Browser Driver Download Quick Reference**

    |Browser	|Supported OS	|Maintained by	|Download	|
    |-----------|---------------|---------------|-----------|
    |Chromium/Chrome|Windows/macOS/Linux|Google|[Downloads](https://chromedriver.chromium.org/downloads)|
    |Firefox|Windows/macOS/Linux|Mozilla|[Downloads](https://github.com/mozilla/geckodriver/releases)|

* **Install and Test Browser Drivers**

    ```bash
    ln -fs /opt/webdriver/geckodriver /usr/bin/geckodriver
    ln -fs /opt/webdriver/chromedriver /usr/bin/chromedriver 

    firefox --version
    Mozilla Firefox 100.0.2

    geckodriver --version
    geckodriver 0.31.0 (b617178ef491 2022-04-06 11:57 +0000)

    google-chrome --version
    Google Chrome 102.0.5005.115

    chromedriver --version
    ChromeDriver 102.0.5005.61
    ```

## 🚀 Get started in 60 seconds

#### 1. Install Synthetic-browser-script from NPM

Initialize a new project with default values if you don't have one:
```bash
# npm
npm init
```

From your existing project's root dir:
```bash
# npm
npm install @instana/synthetic-browser-script --save-dev

# yarn
yarn add -D @instana/synthetic-browser-script
```

#### 2. Run a Demo Test

Synthetic-browser-script comes with useful command line options and a few examples, which are automatically copied to `node_modules/@instana/synthetic-browser-script/examples` during installation and can also be used as boilerplate to write your own tests on top of them.

You can run `--help` and follow the instructions given at the console output
```bash
synb --help
``` 

Use CLI `synb` to execute. 
Use `-b` to specify the browser type (chrome is by default without this option).
Use `-f` to specify the entry point of the javascript test scripts. 

```bash
# copy examples
cp -r node_modules/@instana/synthetic-browser-script/examples .

# run bundled browser test scripts
synb -b chrome -f examples/bundledscripts/mytest.js
```

Execution logs will be shown in console output. 
All the test results including HAR file, videos, screenshots, browser log can be found in the same directory of your test script.

## 🌟 Test with CLI
#### Test with CLI Options
Create a folder for your test scripts and use `-f, --file` to specify the entry point of the test scripts. The test results will be put in the same folder. Synthetic-browser-script comes with examples of [different browser test types](https://pages.github.ibm.com/instana/instana-knowledge-center/synthetic-browser-testing/overview/#new-synthetic-test-types) as `Browser Script`, `Selenium IDE Script`, `single` or `bundled` script in `node_modules/@instana/synthetic-browser-script/examples`. Will take them as examples. For the examples with proxy demonstration as `examples/browserscripts/api-sample-proxy.js` and `examples/side/api-sample-browserapi.side`, you need to change the proxy to the valid one before running it. 

* **Example #1:** Use `synb --help` to check all the CLI options. 

* **Example #2:** Execute browser script test
    
    Instana Synthetic browser testing supports Selenium based APIs, and additional more than 30 extended browser testing APIs. Refer to [Browser Testing API](https://pages.github.ibm.com/instana/instana-knowledge-center/synthetic-browser-testing/browser_api_reference/) reference for useful browser testing APIs. The examples in `examples/browserscripts` demonstrate how to use these APIs. Run a demo test as below. `--delay` `--loglevel` are optional. `--delay` can make test fast by delaying cleanup work. `--loglevel` can set user log level. 

    ```bash
    synb -f examples/browserscripts/api-sample-actions.js --delay --loglevel error
    ```

* **Example #3:** Execute multiple browser scripts
    
    If the business logic is really complex, containing everything in a single script is a bad experiences for developers, multiple script files are also supported for better management, especially managing them in Git repo. You can use bundled scripts and use `-f` to point the entry point. 
    
    In this example `examples/bundledscripts`, we use multiple scripts and `$synthetic` global object to demonstrate how to write complex test scripts.
    The `$synthetic` object's properties can be accessed by user scripts. 
    And `$synthetic.labels` can be defined as `"customProperties"` in Synthetic test.
    
    In your local test env, you can define `examples/bundledscripts/synb.json` to mockup these variables for test purpose. 
    You can also put it in parent path in your project root directory.
    
    ```bash
    synb -f examples/bundledscripts/mytest.js
    ```

* **Example #4:** Execute selenium IDE scripts

    The easiest way to create your own scripts is to use Selenium IDE to record and Synthetic-browser-script to playback.
    1. Download and install Selenium IDE [Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/selenium-ide/versions/) or [Chrome extension](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd) in Firefox/Chrome browser. Restart the browser.
   
    2. Open Selenium IDE from the menu bar. 
    Click `Record a new test in a new project` link in the open-up window, and follow the instructions to record a script.
    When Selenium IDE is recording, it generates a command for each user action in a script.

    3. After recording, save the script into a **.side** file.

    4. You can add commands e.g. `assert title`, or test your script with `run` button.
        ![selenium-side](doc/imgs/selenium-command.png)

    5. Test with Synthetic-browser-script.
        
        Why can not playback with Selenium IDE directly? Instana Synthetic provides more advanced Browser Testing APIs which can not be supported by Selenium IDE. If you are using them, you can run your side script with Synthetic-browser-script. Further more, usually you have cookies or cache in your browser once you access the website, unless you clean them from browser settings, you will not see the same website pages as end users. Thus it is recommended to playback with Instana Synthetic-browser-script.

        ```
        synb --side -f examples/side/search-instana.side
        ```

* **Example #5:** Execute [Jest](https://github.com/facebook/jest) framework-based browser scripts
    
    Some developers use Jest framework, or you want to define steps in browser test. You can use `"scriptType": "Jest"` in your Synthetic test configuration. And use `--jest` to test your script with Synthetic-browser-script.
    
    ```bash
    synb --jest -f examples/jest/myjest.js
    ```

    You can see the test results.
    ```bash
    my jest test
      ✓ step1: test myBeverage
      ✓ step2: test search engine (7.17 s)

    Tests:       2 passed, 2 total
    ```

#### Use Proxy in Local ENV
How can I set a proxy for my local test? You can use environment variables if you do not want to change your scripts.
```bash
export PLAYBACK_PROXY_TYPE="manual"
export PLAYBACK_PROXY_HOST_PORT="hostname:8080"
```
Then you can see the logs:
```bash
2023-05-26T05:29:22Z [SyntheticPoP] [INFO]  manual proxy config {"proxyType":"manual","ftpProxy":"xxxx:8080","httpProxy":"xxxx:8080","sslProxy":"xxxxx:8080"}
```

#### Create Synthetic Test
After test with CLI, you can use [Instana Synthetic Open APIs](https://instana.github.io/openapi/#operation/createSyntheticTest) to create Synthetic test in Instana. 
Use `"syntheticType": "BrowserScript"` for [Browser Script](https://pages.github.ibm.com/instana/instana-knowledge-center/synthetic-browser-testing/browser_script/) test or `"syntheticType": "WebpageScript"` for [Selenium IDE Script](https://pages.github.ibm.com/instana/instana-knowledge-center/synthetic-browser-testing/browser_script/) test.
Use `"script"` for [single test script](https://pages.github.ibm.com/instana/instana-knowledge-center/synthetic-browser-testing/overview/#single-browser-testing-script), or `"scripts"` for [bundled scripts](https://pages.github.ibm.com/instana/instana-knowledge-center/synthetic-browser-testing/overview/#bundled-browser-testing-scripts).
`"retries"` and `"recordVideo"` will only retry or capture video on test failures after you change the default value.
<details>
<summary>Example: Instana browser script test</summary>

```json
{
    "label": "BrowserTesting_Search_Engine",
    "description": "browser multiscripts test",
    "active": true,
    "testFrequency": 10,
    "playbackMode": "Simultaneous",
    "locations": [
        "minikube_PoP_saas_instana_test"
    ],
    "configuration": {
            "script": "escaped script",
            "syntheticType": "BrowserScript",
            "browser": "chrome",
            "timeout" : "5m",
            "retries" : 0,
            "retryInterval": 10,
            "recordVideo": false
    }
}
```
</details>

## 🚤 Develop in IDE
Launch Visual Studio Code with `code .` in your project directory which already set up above. 
You can develop your browser script tests in Visual Studio Code with "code completion" or "code hinting" feature for all the browser testing APIs.

* Workspace in VS Code
    ![vscode-project](doc/imgs/vscode-project.png)

* VS Code IntelliSense for Browser Testing
    ![vscode-intelli](doc/imgs/vscode-hinting.png)

## 🎯 Debugging with VS Code
    
![vscode-debug](doc/imgs/vscode-debug.png)

.vscode/launch.json
```JSON
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "yarn start",
      "runtimeExecutable": "yarn",
      "runtimeArgs": ["start"],
      "port": 5858,
      "cwd": "${workspaceRoot}",
      "timeout": 10000
    }
  ]
}
```

package.json
```JSON
{
  "name": "browser-local-runner",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "synb --file examples/bundledscripts/mytest.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@instana/synthetic-browser-script": "^1.0.1",
    "@types/jest": "^29.0.0"
  }
}
```

## Licence
[MIT](https://github.com/instana/synthetic-browser-script/blob/main/LICENSE)
