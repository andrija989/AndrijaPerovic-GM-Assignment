import { expect } from "../../base/pomFixture";
import generalData from "../../../fixtures/generalData.json";

export class PracticeForms {
  // Constructor for the page.
  constructor(page) {
    // page
    this.page = page;
    this.forms = page.locator('[class="header-text"]', {
      hasText: "Forms",
    });
    this.practiceForms = page.locator('[class="menu-list"] span', {
      hasText: "Practice Form",
    });
    this.firstName = page.locator('[id="firstName"]');
    this.lastName = page.locator('[id="lastName"]');
    this.userEmail = page.locator('[id="userEmail"]');
    this.mobileNumber = page.locator('[id="userNumber"]');
    this.date = page.locator('[id="dateOfBirthInput"]');
    this.subjects = page.locator('[id="subjectsContainer"] input');
    this.uploadImageInput = page.locator('input[id="uploadPicture"]');
    this.adress = page.locator('[id="currentAddress"]');
    this.city = page.locator('[id="city"]');
    this.state = page.locator('[id="state"]');
    this.submit = page.locator('[id="submit"]');
  }
  // page functions
  async setGender(gender) {
    switch (gender) {
      case "Male":
        await this.page.locator('[for="gender-radio-1"]').click();
        break;
      case "Female":
        await this.page.locator('[for="gender-radio-2"]').click();
        break;
      case "Other":
        await this.page.locator('[for="gender-radio-3"]').click();
        break;
    }
  }

  async setHobies(hobies) {
    switch (hobies) {
      case "Sports":
        await this.page.locator('[for="hobbies-checkbox-1"]').click();
        break;
      case "Reading":
        await this.page.locator('[for="hobbies-checkbox-2"]').click();
        break;
      case "Music":
        await this.page.locator('[for="hobbies-checkbox-3"]').click();
        break;
    }
  }

  async uploadImage() {
    await this.page.setInputFiles(
      'input[id="uploadPicture"]',
      "fixtures/images.jpg"
    );
  }

  async navigateToPracticeForms() {
    await this.forms.click();
    await this.practiceForms.click();
    await expect(this.page).toHaveURL(/automation-practice-form/);
  }

  async setDate(date = generalData.formData.date) {
    await this.page.evaluate(() => {
      const inputElement = document.querySelector(this.date);
      if (inputElement) {
        inputElement.value = date;
      }
    });
  }

  async fillForm({
    firstName = generalData.formData.firstName,
    lastName = generalData.formData.lastName,
    userEmail = generalData.formData.email,
    gender = generalData.formData.gender,
    mobileNumber = generalData.formData.mobile,
    adress = generalData.formData.adress,
  }) {
    await this.firstName.type(firstName);
    await this.lastName.type(lastName);
    await this.userEmail.type(userEmail);
    await this.setGender(gender);
    await this.mobileNumber.type(mobileNumber);
    await this.date.type("15 Jun 1990");
    for (let index = 0; index < 12; index++) {
      await this.page.keyboard.press("Delete");
    }
    await this.page.keyboard.press("Enter");
    await this.subjects.type("Ph");
    await this.page.keyboard.press("Enter");
    await this.setHobies(generalData.formData.hobies);
    await this.uploadImage();
    await this.adress.type(adress);
    await this.state.click({ force: true });
    await this.page.keyboard.press("Enter");
    await this.city.click({ force: true });
    await this.page.keyboard.press("Enter");
    await this.submit.click();
    await this.assertForm(firstName, userEmail, gender);
  }

  async assertForm(firstName, userEmail, gender) {
    await expect(
      await this.page.locator(`tr`).nth(1).locator("td").nth(1)
    ).toContainText(firstName);
    await expect(
      await this.page.locator(`tr`).nth(2).locator("td").nth(1)
    ).toContainText(userEmail);
    await expect(
      await this.page.locator(`tr`).nth(3).locator("td").nth(1)
    ).toContainText(gender);
    // we can have more assertations here for all of the input fields
    // the best way would be network response
  }
}
