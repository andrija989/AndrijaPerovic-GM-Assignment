import { expect } from "../../base/pomFixture";
import generalData from "../../../fixtures/generalData.json";
import { General } from "./general";

let general;
export class PlaygroundPage {
  // Constructor for the page.
  constructor(page) {
    // classes
    general = new General(page);
    // page
    this.page = page;
    this.webTables = page.locator('[class="menu-list"] span', {
      hasText: "Web tables",
    });
    this.addNewRecordButton = page.locator('[id="addNewRecordButton"]');
    this.modal = page.locator('[class="modal-content"]');
    this.firstName = this.modal.locator('[id="firstName"]');
    this.lastName = this.modal.locator('[id="lastName"]');
    this.email = this.modal.locator('[id="userEmail"]');
    this.age = this.modal.locator('[id="age"]');
    this.salary = this.modal.locator('[id="salary"]');
    this.department = this.modal.locator('[id="department"]');
    this.submit = this.modal.locator('[id="submit"]');
    this.tableLastRow = page.locator('[class="rt-tr-group"]').nth(3);
    this.tableColumn = this.tableLastRow.locator('[class="rt-td"]');
  }

  // page functions
  async openTabels() {
    await this.webTables.click();
    await expect(this.page).toHaveURL(/webtables/);
  }

  async getTableRowAndCollumnText(row, column, text) {
    await expect(
      this.page
        .locator('[class="rt-tr-group"]')
        .nth(row)
        .locator('[class="rt-td"]')
        .nth(column)
    ).toContainText(text);
  }

  async getDesiredEditButton(row) {
    await this.page.locator(`[id="edit-record-${row}"]`).click();
  }

  async addNewRecord({
    firstName = generalData.person.firstName,
    lastName = generalData.person.lastName,
    age = generalData.person.age,
    email = generalData.person.email,
    salary = generalData.person.salary,
    department = generalData.person.department,
  }) {
    await this.addNewRecordButton.click();
    expect(await this.modal).toBeVisible();
    await this.firstName.type(firstName);
    await this.lastName.type(lastName);
    await this.email.type(email);
    await this.age.type(age);
    await this.salary.type(salary);
    await this.department.type(department);
    await this.submit.click();
    await this.tableAssert({
      firstName,
      lastName,
      age,
      email,
      salary,
      department,
    });
  }

  // Portal do not provide Network assertions that would be better fit here
  async tableAssert({
    firstName = "",
    lastName = "",
    age = "",
    email = "",
    salary = "",
    department = "",
  }) {
    await expect(await this.tableColumn.nth(0)).toContainText(firstName);
    await expect(await this.tableColumn.nth(1)).toContainText(lastName);
    await expect(await this.tableColumn.nth(2)).toContainText(age);
    await expect(await this.tableColumn.nth(3)).toContainText(email);
    await expect(await this.tableColumn.nth(4)).toContainText(salary);
    await expect(await this.tableColumn.nth(5)).toContainText(department);
  }

  async editRecord({
    editButtonNumber = 2,
    firstName = null,
    lastName = null,
    age = null,
    email = null,
    salary = null,
    department = null,
  }) {
    await this.getDesiredEditButton(editButtonNumber);
    if (firstName !== null) {
      await this.firstName.focus();
      await general.clearTextField();
      await this.firstName.type(firstName);
    }
    if (lastName !== null) {
      await this.lastName.focus();
      await general.clearTextField();
      await this.lastName.type(lastName);
    }
    if (email !== null) {
      await this.email.focus();
      await general.clearTextField();
      await this.email.type(email);
    }
    if (age !== null) {
      await this.age.focus();
      await general.clearTextField();
      await this.age.type(age);
    }
    if (salary !== null) {
      await this.salary.focus();
      await general.clearTextField();
      await this.salary.type(salary);
    }
    if (department !== null) {
      await this.department.focus();
      await general.clearTextField();
      await this.department.type(department);
    }
    await this.submit.click();
  }
}
