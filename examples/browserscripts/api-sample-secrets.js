(async function () {
    /**
    * samples of secrets configuration 
    * using $util.secrets to configure URL secrets
    */
    $util.secrets.setURLSecretsRegExps([/redig/i]);
    console.log(">>>>>>>>>>>>>>>>>>>", "Access bing");
    await $browser.get("http://cn.bing.com");
    await $browser.wait($driver.until.titleContains('Bing'), 10000);
    console.log(">>>>>>>>>>>>>>>>>>>", "Take screenshot");
    await $browser.takeScreenshot();
})();