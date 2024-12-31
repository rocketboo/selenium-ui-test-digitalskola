const { By, until } = require('selenium-webdriver');

class InformationPage {
    constructor(driver) {
        this.driver = driver;
        
        this.continueButton = By.id('continue'); 
    }

    async isOnInformation() {
        const titleElement = await this.driver.wait(until.elementLocated(By.className('title')), 10000);
        return titleElement.getText();
    }

    async informationName(firstName, lastName, postalCode) {
        const firstNameField = await this.driver.findElement(By.id('first-name'));
        const lastNameField = await this.driver.findElement(By.id('last-name'));
        const postalCodeField = await this.driver.findElement(By.id('postal-code'));

        await firstNameField.sendKeys(firstName);
        await lastNameField.sendKeys(lastName);
        await postalCodeField.sendKeys(postalCode);
    }

    async clickContinueButton() {
        const continueButton = await this.driver.wait(until.elementLocated(this.continueButton), 20000);
        await this.driver.wait(until.elementIsVisible(continueButton), 20000);
        await this.driver.wait(until.elementIsEnabled(continueButton), 20000);
        await continueButton.click();
    }
}

module.exports = InformationPage;
