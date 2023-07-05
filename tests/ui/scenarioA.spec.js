import { test } from "../../modules/base/pomFixture";

test.describe("B2C testing", () => {
  test.beforeEach(async ({ general }) => {
    await general.visitPage("");
  });

  test("B2C-01 - Validate b2c token", async ({ homePage, playgroundPage }) => {
    await homePage.navigateToElements();
    await playgroundPage.openTabels({});
    await playgroundPage.addNewRecord({});
  });
});
