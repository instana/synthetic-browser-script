const { assert } = require("chai");
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

(async function () {
  const d = new Date();
  let name = month[d.getMonth()];
  let id = d.getMonth() + 1;
  console.log("Current month:", name)

  console.log("Access time and date website");
  await $browser.get("http://www.timeanddate.com");
  /*
  <select id="month" name="month" >
  <option value="1">January</option>
  <option value="2">February</option>
  <option value="3">March</option>
  ...
  </select>
  */

  console.log("Assert default selected month is:", name)
  await $browser.wait($driver.until.elementLocated($driver.By.id("month")), 3000).click();
  assert.equal(id, await $browser.findElement($driver.By.id("month")).getAttribute("value"));
  
  console.log("Assert March selected")
  await $browser.findElement($driver.By.xpath("//select[@id='month']/option[3]")).click();
  assert.equal(3, await $browser.findElement($driver.By.id("month")).getAttribute("value"));
})();
