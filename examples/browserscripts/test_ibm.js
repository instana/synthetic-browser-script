const { assert } = require("chai");
let click = async (message, by, timeout = 60000) => {
  console.log(`Click on ${message} >> ${by} << `);
  try {
    const element = await $browser.waitForAndFindElement(by, timeout);
    const out = $browser.actions().move({ origin: element }).press().release().perform();
    return out;
  } catch (err) {
    console.error(`\ncatch(click): ${err.message}`);
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
    throw err;
  }
}

let accessShadowDOMAndClick = async (
  message,
  shadowHostSelector,
  elementSelector,
  timeout
) => {
  let shadowHost = await $browser.waitForAndFindElement(shadowHostSelector, timeout);
  let shadowRoot = await shadowHost.getShadowRoot();
  let element = await shadowRoot.findElement(elementSelector);
  console.log("element text is:", await element.getText(), ", id is:", await element.getId());
  console.log("Scroll down to ", message);
  await $browser.executeScript("arguments[0].scrollIntoView()", element);
  console.log("Click ", message);
  await $browser.executeScript("arguments[0].click();", element);
};


(async function () {
  console.log("Step1: Open developer education page");
  await $browser.get("https://developer.ibm.com");

  console.log("Step2: Accept all cookies");
  const cookies = await $browser.waitForAndFindElement(
    $driver.By.id(`truste-consent-button`),
    30000
  );
  await cookies.click();

  console.log("Step3: I want to learn programming languages");
  await scrollToViewAndClick("programming tab", $driver.By.id(`tab-link-3-default`), 10000);
  await scrollToViewAndClick('Get started with programming language', $driver.By.css(`a[href*='data-analysis-using-python']`), 10000);

  console.log("Step4: Move to summary page");
  await scrollToViewAndClick('Summary',  $driver.By.linkText(`Summary`), 10000)
})();
