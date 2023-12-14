let click = async (message, by, timeout = 60000) => {
  console.log(`Click on ${message} >> ${by} << `);
  try {
    const element = await $browser.waitForAndFindElement(by, timeout);
    return $browser.actions().move({ origin: element }).click().perform();
  } catch (err) {
    console.error(`\ncatch(click): ${err.message}`);
    throw err;
  }
};

let hover = async (message, by, timeout = 60000) => {
  console.log(`Hover on ${message} >> ${by} << `);
  try {
    const element = await $browser.waitForAndFindElement(by, timeout);
    return $browser.actions().move({ origin: element, duration: 3000 }).perform();
  } catch (err) {
    console.error(`\ncatch(hover): ${err.message}`);
    throw err;
  }
};

(async function () {
  console.log(">>>>>>>>>>>>>>>>>>>", "Access bing page");
  await $browser.get("http://www.bing.com");
  console.log(">>>>>>>>>>>>>>>>>>>", "Actions of search");
  await hover("search button", $driver.By.xpath("//label[@id='search_icon']"), 10000);
  await $browser.takeScreenshot();
  await $browser.actions().sendKeys("synthetic").perform();
  await click("search button", $driver.By.xpath("//label[@id='search_icon']"), 10000);
})();
