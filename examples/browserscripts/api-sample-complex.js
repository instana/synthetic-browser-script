const { assert } = require("chai");

(async function () {
  /**
   * manipulate headers and retrieve all the customized headers
   */
  await $browser.addHeader("test", "test");
  await $browser.addHeaders({ "test1": "test1", "test2": "test2" });
  await $browser.deleteHeaders(["test1", "test2"]);
  $browser.getHeaders().forEach((value, key) => console.log(">>>>>>>>>>>>>>>>>>>", "User customized headers: ", key + "=" + value));

  /**
   * manipulate deny and allow list
   */
  await $browser.addHostnamesToDenylist(["*google*", "*timeanddate*"]);
  await $browser.deleteHostnameFromDenylist("*timeanddate*");

  /**
   * open url www.bing.com
   * find element by class selector
   * send keys to search Synthetic in the page
   */
  console.log(">>>>>>>>>>>>>>>>>>>", "Access bing page");
  await $browser.get("http://www.bing.com");
  console.log(">>>>>>>>>>>>>>>>>>>", "Actions of search");
  // Find element by XPath and wait for the element until specified timeout value reached
  await $browser.waitForAndFindElement($driver.By.xpath(`//textarea[@inputmode='search']`), 10000);
  // Sleep or pause to wait for specified milliseconds 
  await $browser.sleep(5000);
  // Take a screenshot
  await $browser.takeScreenshot();
  // Actions to send keys
  await $browser.actions().sendKeys("synthetic").sendKeys($driver.Key.ENTER).perform();

  /* Find element by CSS selector and perform actions
  let textarea = await $browser.waitForAndFindElement($driver.By.css('#sb_form_q'), 10000);
  // Actions to send keys
  await $browser
    .actions()
    .move({ origin: textarea })
    .sendKeys("synthetic")
    .pause(5000)
    .sendKeys($driver.Key.ENTER)
    .perform();
  */
  
  /**
   * samples of promise chain invocation, which is not recommended but backwards compatible
   * samples of waiting and polling function with timeout value
   */
  await $browser.deleteHostnameFromDenylist("*google*");
  await $browser.get("https://www.google.com");
  // Call the wait function.
  await $browser.wait(function () {
    return $browser.getTitle().then(function (title) {
      return title.includes("Google");
    });
    //If the condition isn't satisfied within 10000 milliseconds (10 seconds), proceed anyway.
  }, 10000).then(function () {
    return $browser.findElement($driver.By.linkText("About")).click();
  }).then(function () {
    return $browser.navigate().back();
  });

})();