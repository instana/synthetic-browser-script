const myBeverage = {
  delicious: true,
  sour: false,
};

describe("my jest test", () => {
  test("step1: test myBeverage", async () => {
    expect(myBeverage.sour).toBeFalsy();
    expect(myBeverage.delicious).toBeTruthy();
  }, 10000);

  test("step2: test search engine", async () => {
    console.log(">>>>>>>>>>>>>>>>>>>", "Access bing page");
    await $browser.get("http://www.bing.com");
    console.log(">>>>>>>>>>>>>>>>>>>", "Actions of search");
    await $browser.waitForAndFindElement($driver.By.id("sbi_b"), 3000);
    await $browser.$(".sb_form_q");
    await $browser.actions().sendKeys("synthetic").sendKeys($driver.Key.ENTER).perform();
    await $browser.wait($driver.until.titleIs("synthetic - Search"), 3000);
    
    let title = await $browser.getTitle();
    expect(title).toEqual("synthetic - Search");
    console.log(">>>>>>>>>>>>>>>>>>>", "Page title: ", title);
  }, 10000);
});
