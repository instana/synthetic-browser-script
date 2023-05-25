const assert = require("assert").strict;
const By = $driver.By;

(async function () {
  /**
   * samples of customization of synthetic monitoring attributes
   * using $util.insights
   */
  console.log(">>>>>>>>>>>>>>>>>>>", "Access time and date page");
  await $browser.get("https://www.ibm.com");
  console.log(">>>>>>>>>>>>>>>>>>>", "Page title: ", await $browser.getTitle());
  $util.insights.set('Title', await $browser.getTitle());

  let items = await $browser.findElements(By.css('.bx--tableofcontents__desktop__item a'));
  items.forEach(async (item, index, array) => {
    $util.insights.set(`navigation_${index}`, await item.getText());
  });

  for(let key of $util.insights.getKeys()) {
    console.log(">>>>>>>>>>>>>>>>>>>", key, " = ", $util.insights.get(key));
  }
})();
