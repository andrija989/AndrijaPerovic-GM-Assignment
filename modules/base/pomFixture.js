/*eslint no-empty-pattern: 0*/

import { chromium, test as baseTest } from "@playwright/test";
import { General } from "../ui/getters/general";
import { HomePage } from "../ui/getters/homePage";
import { PlaygroundPage } from "../ui/getters/playgroundPage";
import { BrokenImagesPage } from "../ui/getters/brokenImagesPage";
import { PracticeForms } from "../ui/getters/praticeForms";
import { ProgressBar } from "../ui/getters/progressBar";
import { HoverPage } from "../ui/getters/hoverPage";
import { DragAndDrop } from "../ui/getters/dragAndDrop";
import { RegisterAPI } from "../api/register";
import { LoginAPI } from "../api/login";
import { BooksAPI } from "../api/books";

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
  brokenImagesPage: async ({ wpage }, use) => {
    await use(new BrokenImagesPage(wpage));
  },
  practiceForms: async ({ wpage }, use) => {
    await use(new PracticeForms(wpage));
  },
  progressBar: async ({ wpage }, use) => {
    await use(new ProgressBar(wpage));
  },
  hoverPage: async ({ wpage }, use) => {
    await use(new HoverPage(wpage));
  },
  dragAndDrop: async ({ wpage }, use) => {
    await use(new DragAndDrop(wpage));
  },
  registerAPI: async ({ wpage }, use) => {
    await use(new RegisterAPI(wpage));
  },
  loginAPI: async ({ wpage }, use) => {
    await use(new LoginAPI(wpage));
  },
  booksAPI: async ({ wpage }, use) => {
    await use(new BooksAPI(wpage));
  },
});

export const test = testPages;
export const expect = testPages.expect;
