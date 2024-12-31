const { By, until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
    }

   
    async isOnCart() {
        const titleElement = await this.driver.wait(until.elementLocated(By.css('.title')), 60000);
        const title = await titleElement.getText();
        return title;
    }

    
    async isCartItemVisible() {
        const cartItems = await this.driver.wait(until.elementsLocated(By.css('.inventory_item_name')), 60000);
        return cartItems.length > 0;
    }
    
    async checkoutButton() {
        const checkoutButton = await this.driver.wait(until.elementLocated(By.xpath("//button[@id='checkout']")), 60000);
        await this.driver.wait(until.elementIsVisible(checkoutButton), 60000);
        await this.driver.wait(until.elementIsEnabled(checkoutButton), 60000);
        await checkoutButton.click();
    }
}

module.exports = CartPage;
