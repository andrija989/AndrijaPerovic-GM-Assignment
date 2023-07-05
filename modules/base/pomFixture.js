/*eslint no-empty-pattern: 0*/

import { chromium, test as baseTest } from "@playwright/test";
import { General } from "../ui/getters/general";
import { HomePage } from "../ui/getters/homePage";
import { PlaygroundPage } from "../ui/getters/playgroundPage";

const testPages = baseTest.extend({
  wpage: [
    async ({}, use) => {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await use(page);
      await page.close();
      await context.close();
      await browser.close();
    },
    { auto: "true" },
  ],
  general: async ({ wpage }, use) => {
    await use(new General(wpage));
  },
  homePage: async ({ wpage }, use) => {
    await use(new HomePage(wpage));
  },
  playgroundPage: async ({ wpage }, use) => {
    await use(new PlaygroundPage(wpage));
  },
});

export const test = testPages;
export const expect = testPages.expect;
