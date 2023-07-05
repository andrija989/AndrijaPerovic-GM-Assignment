export class General {
  // Constructor for the page.
  constructor(page) {
    // page
    this.page = page;
  }
  // Visit a page and wait for it to finish
  async visitPage(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState("load");
  }

  async delayTests(ms) {
    const delay = new Promise((resolve) => setTimeout(resolve, ms));
    return delay;
  }

  async clearTextField(numOfTimes = 10) {
    for (let i = 0; i <= numOfTimes; i++) {
      await this.page.keyboard.press("Backspace");
    }
  }
}
