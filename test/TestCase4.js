const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const InformationPage = require('../WebComponent/InformationPage');
const CheckoutPage = require('../WebComponent/CheckoutPage');
const CompletePage = require('../WebComponent/CompletePage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 4 [login] #Regression #Smoke', function () {
    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break;
      }
    
        //Run setiap mulai test, satu kali saja paling awal
        before(async function (){
            driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
        });
    

    before(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
    });

    it('Login successfully and verify dashboard', async function () {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    });

    
    it('Add item to cart', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.addToCart();
        const isAdded = await dashboardPage.isItemAddedToCart();
        assert.strictEqual(isAdded, true, 'Item not found in the cart');
    });

    
    it('Navigate to cart and verify page title', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.goToCart();
        const cartPage = new CartPage(driver);
        const title = await cartPage.isOnCart();  
        assert.strictEqual(title, 'Your Cart', 'Expected title to be "Your Cart"');
    });

    
    it('Verify if item is visible in cart', async function () {
        const cartPage = new CartPage(driver);
        const isVisible = await cartPage.isCartItemVisible();
        assert.strictEqual(isVisible, true, 'Item not visible in cart');
    });

    
    it('Click checkout button', async function () {
        const cartPage = new CartPage(driver);  // 
        await cartPage.checkoutButton();
    });
    it('information form', async function () {
            const informationPage = new InformationPage(driver);
            const title = await informationPage.isOnInformation();
            assert.strictEqual(title, 'Checkout: Your Information', 'Expected dashboard title to be Your Information');
        });
    it('writeInformation', async function () {
            const informationPage = new InformationPage(driver);
            await informationPage.informationName('John', 'Doe', '12345');
        });
        it('Click continue button', async function () {
            const informationPage = new InformationPage(driver);  
            await informationPage.clickContinueButton();
        });
    it('checkout', async function () {
            const checkoutPage = new CheckoutPage(driver);
            const title = await checkoutPage.isOnCheckout();
            assert.strictEqual(title, 'Checkout: Overview', 'Expected dashboard title to be Checkout: Overview');
        });
    it('verify cart item visibility in checkout', async function () {
            const checkoutPage = new CheckoutPage(driver);
            const isVisible = await checkoutPage.isCartItemVisible();
            assert.strictEqual(isVisible, true, 'Item not visible in checkout');
        });
     it('finish checkout', async function () {
            const checkoutPage = new CheckoutPage(driver);
            await checkoutPage.finishButton();
        });
    it('checkout successfully', async function () {
            const completePage = new CompletePage(driver);
            const title = await completePage.isOnComplete();
            assert.strictEqual(title, 'Checkout: Complete!', 'Expected dashboard title to be Checkout: Complete!');
        });
        
    after(async function () {
        const screenshotPath = `${screenshotDir}/${new Date().toISOString()}.png`;
        await driver.takeScreenshot().then(function (data) {
            fs.writeFileSync(screenshotPath, data, 'base64');
        });
    });

    after(async function () {
        await driver.quit();
    });
});
