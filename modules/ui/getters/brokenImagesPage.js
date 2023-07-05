import { expect } from "../../base/pomFixture";

export class BrokenImagesPage {
  // Constructor for the page.
  constructor(page) {
    // page
    this.page = page;
    this.brokenImages = page.locator('[class="menu-list"] span', {
      hasText: "Broken Links - Images",
    });
    this.img = page.locator("img");
  }
  // page functions

  async navigateToBrokenImages() {
    await this.brokenImages.click();
    await expect(this.page).toHaveURL(/broken/);
  }

  async validateBrokenImage(id = 3) {
    const elWidth = await this.img.nth(id).boundingBox();
    expect(await this.img.nth(id)).toBeVisible();
    expect(Math.floor(elWidth.width)).toEqual(50);
  }
}
