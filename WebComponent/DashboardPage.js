const { By, until } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
    }

  
    async isOnDashboard() {
        const title = await this.driver.wait(until.elementLocated(By.className('title')), 10000);
        return title.getText();
    }

    
    async addToCart() {
        const addToCartButton = await this.driver.wait(until.elementLocated(By.css('.btn_inventory')), 10000);
        await addToCartButton.click();
    }

   
    async isItemAddedToCart() {
        const cartBadge = await this.driver.wait(until.elementLocated(By.css('.shopping_cart_badge')), 10000);
        return cartBadge !== null;
    }

   
    async goToCart() {
        const cartButton = await this.driver.wait(until.elementLocated(By.css('.shopping_cart_link')), 10000);
        await cartButton.click();
    }
}

module.exports = DashboardPage;
