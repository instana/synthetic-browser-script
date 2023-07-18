let click = async (message, by, timeout = 60000) => {
    console.log(`Click on ${message} >> ${by} << `);
    try {
        const element = await $browser.waitForAndFindElement(by, timeout);
        const out = $browser.actions().move({origin: element}).press().release().perform();
        return out;
    } catch (err) {
        console.error(`\ncatch(click): ${err.message}`);
        await $browser.takeScreenshot();
        throw err;
    }
}

let hover = async (message, by, timeout = 60000) => {
    console.log(`Hover on ${message} >> ${by} << `);
    try {
        const element = await $browser.waitForAndFindElement(by, timeout);
        //const out = $browser.actions().move({origin: element, duration: 2000}).perform();
        const out = $browser.actions().mouseMove(element).perform();
        return out;
    } catch (err) {
        console.error(`\ncatch(hover): ${err.message}`);
        await $browser.takeScreenshot();
        throw err;
    }
}

(
    async function () {
        console.log(">>>>>>>>>>>>>>>>>>>", "Access bing page");
        await $browser.get("http://www.bing.com");
        console.log(">>>>>>>>>>>>>>>>>>>", "Actions of search");
        await hover("search image", $driver.By.xpath("//img[@id='sbi_b']"));
        await $browser.sleep(3000);
        await $browser.actions().sendKeys("synthetic").perform();
        await click("search button", $driver.By.xpath("//label[@id='search_icon']"));
    }
)();