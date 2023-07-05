import { expect } from "../../base/pomFixture";

export class HomePage {
  // Constructor for the page.
  constructor(page) {
    // page
    this.page = page;
    this.elementsCard = page.locator('[class="card-body"]', {
      hasText: "Elements",
    });
  }
  // page functions

  async navigateToElements() {
    await this.elementsCard.click();
    await expect(this.page).toHaveURL(/elements/);
  }

  async navigateToElements() {
    await this.elementsCard.click();
    await expect(this.page).toHaveURL(/elements/);
  }
}
