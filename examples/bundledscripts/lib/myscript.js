async function testBing() {
    // navigate to www.bing.com
    console.log(">>>>>>>>>>>>>>>>>>>", "Access bing page");
    await $browser.get("http://www.bing.com");
    //await $browser.sleep(3000);

    // perform search action
    console.log(">>>>>>>>>>>>>>>>>>>", "Actions of search");
    await $browser.waitForAndFindElement($driver.By.id("sbi_b"), 3000);
    await $browser.$(".sb_form_q").click();
    await $browser.actions().sendKeys("synthetic").sendKeys($driver.Key.ENTER).perform();
    
    // assert page title by getTitle() api
    await $browser.wait($driver.until.titleIs("synthetic - Search"), 3000);
    let pageTitle = await $browser.getTitle();
    console.log(">>>>>>>>>>>>>>>>>>>", "Page title: ", pageTitle);

    // take screenshot
    console.log(">>>>>>>>>>>>>>>>>>>", "TakeScreenshot");
    await $browser.takeScreenshot();
    $util.insights.set("TIP_TRIBE_NAME_LABEL", "something");
};
module.exports = {
	    testBing
};
