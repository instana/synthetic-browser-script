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


## Licence
[MIT](https://github.com/instana/synthetic-browser-script/blob/main/LICENSE)
