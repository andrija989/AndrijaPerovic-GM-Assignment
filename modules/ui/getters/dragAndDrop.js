import { expect } from "../../base/pomFixture";
import { General } from "./general";

let general;

export class DragAndDrop {
  // Constructor for the page.
  constructor(page) {
    // page
    this.page = page;
    general = new General(page);
    this.interactions = page.locator('[class="header-text"]', {
      hasText: "Interactions",
    });
    this.dragAndDrop = page.locator('[class="menu-list"] span', {
      hasText: "Droppable",
    });
    this.dragItem = page.locator('[id="draggable"]');
    this.dropItem = page.locator('[id="droppable"]').first();
  }
  // page functions
  async navigateToDragAndDrop() {
    await this.interactions.click();
    await this.dragAndDrop.click();
  }

  async moveItem() {
    await this.navigateToDragAndDrop();
    const source = this.dragItem;
    const target = this.dropItem;
    await source.dragTo(target);
  }
}
