const { By, until } = require('selenium-webdriver');

class CompletePage {
    constructor(driver) {
        this.driver = driver;
    }

    async isOnComplete() {
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }
}

module.exports = CompletePage;
