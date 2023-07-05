import { expect } from "../../base/pomFixture";
import { General } from "./general";

let general;

export class HoverPage {
  // Constructor for the page.
  constructor(page) {
    // page
    this.page = page;
    general = new General(page);
    this.widgets = page.locator('[class="header-text"]', {
      hasText: "Widgets",
    });
    this.toolTips = page.locator('[class="menu-list"] span', {
      hasText: "Tool tips",
    });
    this.hoverButton = page.locator('[id="toolTipButton"]');
  }
  // page functions
  async navigateToToolTips() {
    await this.widgets.click();
    await this.toolTips.click();
  }

  async validateTooltip() {
    await this.navigateToToolTips();
    await this.hoverButton.hover();
    await expect(
      this.page.getByText("You hovered over the Button")
    ).toBeVisible();
  }
}
