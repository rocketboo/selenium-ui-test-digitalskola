const { By, until } = require('selenium-webdriver');

class DashboardPage {
    constructor(driver) {
        this.driver = driver;
    }

    async isOnDashboard() {
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

    async addToCart() {
        const addButton = await this.driver.wait(
            until.elementLocated(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")),
            10000
        );
        await this.driver.wait(until.elementIsVisible(addButton), 10000);
        await addButton.click();

        await this.driver.sleep(500); 

        const updatedAddButton = await this.driver.findElement(By.xpath("//button[@id='remove-sauce-labs-backpack']"));
        const updatedButtonText = await updatedAddButton.getText(); 
        return updatedButtonText === 'Remove';
    }

    async isItemAddedToCart() {
        try {
            const cartBadge = await this.driver.findElement(By.css('.shopping_cart_badge'));
            const count = parseInt(await cartBadge.getText(), 10);
            return count > 0;
        } catch (error) {
            return false;
        }
    }
}

module.exports = DashboardPage;