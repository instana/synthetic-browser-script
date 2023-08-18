const { assert } = require("chai");
let click = async (message, by, timeout = 60000) => {
  console.log(`Click on ${message} >> ${by} << `);
  try {
    const element = await $browser.waitForAndFindElement(by, timeout);
    const out = $browser.actions().move({ origin: element }).press().release().perform();
    return out;
  } catch (err) {
    console.error(`\ncatch(click): ${err.message}`);
    await $browser.takeScreenshot();
    throw err;
  }
};


let scrollToViewAndClick = async (message, by, timeout = 60000) => {
  try {
    const element = await $browser.waitForAndFindElement(by, timeout);
    console.log("Scroll down to ", message)
    await $browser.executeScript("arguments[0].scrollIntoView()", element);
    console.log("Click ", message);
    await $browser.executeScript("arguments[0].click();", element);
  } catch (err) {
    console.error(`\ncatch(scrollToViewAndClick): ${err.message}`);
    await $browser.takeScreenshot();
    throw err;
  }
}

(async function () {
  await $browser.get("https://www.ibm.com/us-en");

  console.log("Step1: Accept all cookies");
  const cookies = await $browser.waitForAndFindElement(
    $driver.By.id(`truste-consent-button`),
    30000
  );
  await cookies.click();

  console.log("Step2: Scroll down to developer education link and navigate to it");
  await scrollToViewAndClick('developer link', $driver.By.linkText(`Developer education`), 30000);
  console.log("Assert page title");
  await $browser.waitForAndFindElement($driver.By.css(`h1 > strong`), 30000);
  assert.equal("Home - IBM Developer", await $browser.getTitle());

  console.log("Step3: I want to learn Node.js");
  await click("programming tab", $driver.By.css(`#tab-link-3-default`), 10000);
  await scrollToViewAndClick('Get started with Node.js', $driver.By.css(`#tab-panel-3-default > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1) > div:nth-child(2)`), 10000);

  console.log("Step4: Move to Node.js summary");
  await scrollToViewAndClick('Summary',  $driver.By.linkText(`Summary`), 10000)
})();
