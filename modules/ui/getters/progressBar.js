import { expect } from "../../base/pomFixture";
import { General } from "./general";

let general;

export class ProgressBar {
  // Constructor for the page.
  constructor(page) {
    // page
    this.page = page;
    general = new General(page);
    this.widgets = page.locator('[class="header-text"]', {
      hasText: "Widgets",
    });
    this.progressBarWidget = page.locator('[class="menu-list"] span', {
      hasText: "Progress bar",
    });
    this.progressBar = page.locator('[role="progressbar"]');
    this.startStopButton = page.locator('[id="startStopButton"]');
  }
  // page functions
  async navigateToProgressBar() {
    await this.widgets.click();
    await this.progressBarWidget.click();
  }

  async validateProgress() {
    await this.navigateToProgressBar();
    await expect(await this.progressBar).toContainText("0");
    await this.startStopButton.click();
    await general.delayTests(7500);
    await expect(await this.progressBar).toContainText("100");
  }
}
