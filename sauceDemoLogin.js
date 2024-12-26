const {Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');
const { title } = require('process');

async function sauceDemoLoginTest() {
     // membuat koneksi dengan browser driver
     let driver = await new Builder().forBrowser('chrome').build();

     //exception handling & conclusion
        try{
            //buka url di browser
            await driver.get("https://saucedemo.com");

            // masukan username dan password
            await driver.findElement(By.id('user-name')).sendKeys('standard_user');
            await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');


            // click botton login
            await driver.findElement(By.xpath("//input[@id='login-button']")).click();

            // memastikan kita didashboard dengan mencari judul swag labs
            let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
            assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include'Swag Labs");

            // memastikan kita didashboard dengan mencari burger button
            let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
            assert.strictEqual(await menuButton.isDisplayed(),true,"Menu Button is not visible");
            
            //addToCart
           await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        
            // memastikan item berhasil ditambahkan
            //await driver.findElement(By.xpath("//div[@id='shopping_cart_container']/a[1]")).click();
            
            //let item = await  driver .findElement(By.xpath("//div[@class='inventory_item_name']")).getText();
            //assert.strictEqual(item.includes('Sauce Labs Backpack'),true,"failed to add item");
            
            let cartBdge = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
            assert.strictEqual(await cartBdge.isDisplayed(1),true,"failed to add item");
        } 
        finally {
            //tutup browser
           // await driver.quit();
        }
        
    }
    sauceDemoLoginTest();
