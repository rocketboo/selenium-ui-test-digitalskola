const {Builder, By, Key, until} = require('selenium-webdriver');

async function exampleTest() {

    // membuat koneksi dengan browser driver
    let driver = await new Builder().forBrowser('chrome').build();

    //exception handling & conclusion
    try{
        //buka url di browser
        await driver.get("https://google.com");

        // mencari di searchbox
        let searchBox = await driver.findElement(By.name('q'));

        // simulate behavior typing "hello world"
        await searchBox.sendKeys("hello world", Key.RETURN);
        await driver.wait(until.elementLocated(By.id('result-stats')),10000);

        let title = await driver.getTitle();
        console.log(`page Title is: ${title}`);
    } finally {
        //tutup browser
        //await driver.quit();
    }
    
}
exampleTest();