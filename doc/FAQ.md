# Frequently Asked Questions

## 🌟 Why don't Selenium recorded scripts run successfully in Instana? 
This issue is usually because you have existed cookies and history data in your browsers, thus you can not see popup windows such as accept cookies in front of your website. Usually you need to close the popup window before your actions. 

Even though you can run your scripts successfully locally with Selenium plugin, you may not run it successfully in Instana because of popup windows. Thus you are recommended to use Instana [Synthetic-browser-script](https://www.npmjs.com/package/%40instana/synthetic-browser-script) local runner to test your script locally after recorded with Selenium IDE. The Synthetic-browser-script local runner will provide you clear user profiles as end user experience, and you can see full browsers and your script actions. 

## 🌟 How to resolve the issue of element is not clickable

This is a commonly asked questions. You may see your test failed with error message as `is not clickable at point (285,436) because another element <li> obscures it` or `Failed to execute command clickElement {} element not interactable`. To resolve this issue, you need to move your mouse to focus on the element. You can use the solutions as below:

#### 1. Scroll to view and click
This is a solution always works. You need to use JavaScript command to accomplish this. For Selenium IDE recorded script, you can use `runScript` or `executeScript` to call Instana extended APIs to use the same JavaScript code.

```javascript
let element = await $browser.findElement(By.xpath(`//a[contains(.,'Customer stories')]`)); 
await $browser.executeScript(`arguments[0].scrollIntoView()`, element); 
await $browser.executeScript(`arguments[0].click()`, element)											
```

Or for Selenium SIDE script
```json
{
"id": "b345d354-1d95-45d0-81ab-7c78695ed040",
"comment": "",
"command": "runScript",
"target": "let element = await $browser.findElement(By.xpath(`//a[contains(.,'Customer stories')]`)); await $browser.executeScript(`arguments[0].scrollIntoView()`, element); await $browser.executeScript(`arguments[0].click()`, element)",
"targets": [],
"value": ""
}, 
```

#### 2. Using ActionChains
Using ActionChains to move to the element and click.
```javascript
let element = await $browser.waitForAndFindElement($driver.By.linkText(`Business to business (BtoB) activities`), 10000); 
await $browser.actions().move({origin: element}).click().perform();
```  

#### 3. Using MouseOver in Selenium SIDE script
Selenium has a statement of the [MouseOver command](https://www.selenium.dev/selenium-ide/docs/en/introduction/faq#how-do-i-record-hovers).

```json
{
"id": "2d5c6b52-d2d7-4592-8052-87572a09e58b",
"comment": "",
"command": "mouseOver",
"target": "xpath=//dds-megamenu-category-link[contains(.,'Bridge observability and automated resource management')]",
"targets": [],
"value": ""
}, 
```
Actually MouseOver is parsed as following code. 
```javascript
await driver.wait(until.elementLocated(By.xpath(`//dds-megamenu-category-link[contains(.,\'Bridge observability and automated resource management\')]`)), configuration.timeout);
await driver.findElement(By.xpath(`//dds-megamenu-category-link[contains(.,\'Bridge observability and automated resource management\')]`))
.then(element => {
    return driver.actions({
      bridge: true
    }).move({
      origin: element
    }).perform();
  });
```

## 🌟 How to work with iframes and frames
Sometimes you might get a no such element error if your website using frames. To interact with the elements, we will need to first switch to the frame or iframe `$browser.switchTo().frame(id: number | WebElement);`. In Instana Browser script test, you can use the code as below:
```javascript
let frameElement = await $browser.waitForAndFindElement($driver.By.xpath('//*[contains(@id, "pop-frame")]'), 10000);
await $browser.switchTo().frame(frameElement);
```

## 🌟 How to find one or more specific web elements
A reference from Selenium about [locator strategies](https://www.selenium.dev/documentation/webdriver/elements/locators/).
| Function                       | Description     |
| -------------------------- | ---------------------------------  |
|`$browser.waitForAndFindElement($driver.By.id("boxyear"), 1000)`| Wait and find element by ID until the element is visible or timeout value reached. | 
|`$browser.findElements($driver.By.css('select'))`| Search for multiple elements on the page with the CSS selector.| 
|`$browser.findElement($driver.By.linkText("About"))`| Find element by linkText|
|`$browser.waitForAndFindElement($driver.By.id("boxyear"), 1000)`| Find element by ID|
|`$browser.findElement($driver.By.xpath('//input[@value='f']'))`| Find element by xpath|

More information about how to use XPath and CSS selector to help you move fast. 
The format of CSS selector `By.css(element[attribute='attribute-value'])`.

The format of XPath expression `By.xpath("//element[@attribute='value']")` or `By.xpath("//*[@attribute='value']")`
How to find an element by attributes e.g. `<a href="mysite.com"></a>`:

```javascript
// CSS selector
$driver.By.css(a[href*="example"] )
```
```javascript
// XPath expression
$driver.By.xpath("//a[contains(@href,'Electronics')]")
$driver.By.xpath(`//dds-footer-nav-item[contains(.,'Developer education')]`)
```

		


