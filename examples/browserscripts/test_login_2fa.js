/**
 * This is a sample script to demonstrate how to login with 2FA authentication.
 * To local test local run, replace the variables of url and $secure in synb.json with actual values.
 * To run Synthetic tests in Instana, replace the url with the actual value, 
 * and create user credentials of username, password, totpKey with Instana Open API first.
 */
const url = $synthetic.url;
const timeout = 20000;

async function findElementByIdAndSendKeys(id, keys, timeout) {
  await $browser.waitForAndFindElement($driver.By.id(id), timeout);
  await $browser.findElement($driver.By.id(id)).then((element) => {
    return element.click();
  });
  await $browser.findElement($driver.By.id(id)).then((element) => {
    return element.clear().then(() => {
      return element.sendKeys(keys);
    });
  });
}

async function findButtonByClassAndClick(className) {
  await $browser.waitForAndFindElement(
    $driver.By.className(className),
    timeout
  );
  let element = await $browser.findElement($driver.By.className(className));
  await $browser.actions().move({ origin: element }).click(element).perform();
}

(async function () {
  console.log("================>", "Open Login page");
  await $browser.get(url);

  console.log("================>", "Input email");
  await findElementByIdAndSendKeys("email", $secure.username, timeout);

  console.log("================>", "Input password");
  await findElementByIdAndSendKeys("password", $secure.password, timeout);

  console.log("================>", "Click login");
  await findButtonByClassAndClick("in-button");

  console.log("================>", "Generate TOTP token");
  /**
   * Generate a Time-based One-time Password (TOTP) token from a TOTP key. 
   * The TOTP token needs to be generated in runtime whenever you need to input it, 
   * since it will expire in 30 s by default.
   */
  let totp_token = $browser.generateTOTPToken($secure.totpKey);
  console.log("================>", "Input 2FA token");
  await findElementByIdAndSendKeys("password", totp_token);

  console.log("================>", "Click Sign In");
  await findButtonByClassAndClick("in-button");

  console.log("================>", "Navigate to Synthetic Monitoring");
  await $browser.waitForAndFindElement(
    $driver.By.id(`main-nav-synthetics`),
    timeout
  );
  let element = await $browser.findElement(
    $driver.By.id(`main-nav-synthetics`)
  );
  await $browser.actions().move({ origin: element }).click(element).perform();

  await $browser.waitForAndFindElement(
    $driver.By.xpath(`//a[contains(*, 'Locations')]`),
    timeout
  );
})();
