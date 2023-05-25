const url = require("url");
const URL = url.URL;
const { assert } = require("chai");

let website;
let proxyServer = "proxyHost:proxyPort";
let sslProxyServer = "username:password@proxyHost:proxyPort";

async function accessWebSite(url) {
  console.log(">>>>>>>>>>>>>>>>>>>", "Proxy configuration is: ", JSON.stringify($network.getProxy()));
  console.log(">>>>>>>>>>>>>>>>>>>", `Access website ${url}`);
  await $browser.get(url);
  await $browser.findElement($driver.By.name('q')).click();
  await $browser.actions().sendKeys('synthetic').sendKeys($driver.Key.ENTER).perform();
  await $browser.takeScreenshot();
  return $browser.getCurrentUrl();
}

function checkHostname(hostname, website) {
  let actualURL = new URL(website);
  console.log(">>>>>>>>>>>>>>>>>>>", "Hostname is: ", actualURL.hostname);
  assert.equal(actualURL.hostname, hostname);
}

(async function () {
  /**
   * samples of proxy configuration settings with await asynchronous 
   * using $network tools
   */
  console.log(">>>>>>>>>>>>>>>>>>>", "Clear proxy configuration");
  await $network.clearProxy();
  console.log(">>>>>>>>>>>>>>>>>>>", "Set proxy configuration for HTTPS request with string");
  await $network.setProxyForHttps(proxyServer);
  website = await accessWebSite("https://www.bing.com");
  checkHostname("www.bing.com", website)

  console.log(">>>>>>>>>>>>>>>>>>>", "Clear proxy configuration");
  await $network.clearProxy();
  console.log(">>>>>>>>>>>>>>>>>>>", "Set proxy configuration for HTTPS request with URL object");
  let testURL = new URL("http://" + sslProxyServer);
  await $network.setProxyForHttps(testURL);
  website = await accessWebSite("https://www.google.com");
  checkHostname("www.google.com", website);


  /**
   * samples of proxy configuration settings with bypass list
   */
  await $network.clearProxy();
  await $network.setProxy(proxyServer, "www.google.com");
  console.log(">>>>>>>>>>>>>>>>>>>", "Proxy config: ", $network.getProxy());
  website = await accessWebSite("https://www.bing.com");
  checkHostname("www.bing.com", website);

  /**
   * samples of proxy configuration settings with promise chain
   * not recommended but be compatible 
   * using $network tools
   */
  console.log(">>>>>>>>>>>>>>>>>>>", "Clear proxy configuration");
  $network.clearProxy().then(() => {
    console.log(">>>>>>>>>>>>>>>>>>>", "Set proxy configuration for all requests with bypass list");
    return $network.setProxy(proxyServer, "www.google.com").then(
      console.log(">>>>>>>>>>>>>>>>>>>", "Proxy config: ", $network.getProxy())
    )
  }).then(
    accessWebSite("https://www.bing.com").then((urlStr) => { checkHostname("www.bing.com", urlStr); })
  );

})();



