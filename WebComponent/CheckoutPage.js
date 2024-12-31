const { By, until } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
    }

  
    async isOnCheckout() {
        const title = await this.driver.wait(until.elementLocated(By.className('title')), 10000);
        return title.getText();
    }
    async isCartItemVisible() {
        const cartItem = await this.driver.wait(until.elementLocated(By.css('.cart_item')), 10000);
        return await cartItem.isDisplayed(); 
        }

    async finishButton() {
        const finishButton = await this.driver.wait(until.elementLocated(By.id('finish')), 10000);
        await finishButton.click();
    }
}

module.exports = CheckoutPage;

