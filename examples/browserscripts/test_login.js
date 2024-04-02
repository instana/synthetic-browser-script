/**
 * This is a sample login script with 2FA authentication.
 * You can not run it directly, unless you replace url, and $secure with acutal ones.
 * To local test local run, replace the constant values of url and $secure.
 * To run Synthetic test in Instana, create user credentials of user, pass, mfa_key with Instana Open API first.
 */
const url = `your website URL`;
const totp = require("totp-generator");
const timeout = 20000;

// You can remove this constant if you have defined user credentials in Instana.
const $secure = {
  username: global.$secure.user ?? "your email",
  password: global.$secure.pass ?? "your password",
  mfa_key: global.$secure.mfa_key ?? "your 2FA key",
};

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
   * Generate a time-based 2FA token. It needs to be generated in runtime whenever you need to input it.
   * The default settings of the 2FA token are: 30 second period, 6 digits.
   * Settings can be provided as an optional second parameter inside an object.
   * const token = totp("JBSWY3DPEHPK3PXP", {
   *   digits: 8,
   *   algorithm: "SHA-512",
   *   period: 60,
   * });
   */
  let totp_token = totp($secure.mfa_key);
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
