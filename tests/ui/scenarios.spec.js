import { test } from "../../modules/base/pomFixture";
import generalData from "../../fixtures/generalData.json";

test.describe("UI scenarios", () => {
  test.beforeEach(async ({ homePage, general }) => {
    await general.visitPage("");
    await homePage.navigateToElements();
  });

  test("TC - 01", async ({ playgroundPage }) => {
    await playgroundPage.openTabels({});
    await playgroundPage.addNewRecord({});
  });

  test("TC - 02", async ({ playgroundPage }) => {
    await playgroundPage.openTabels({});
    await playgroundPage.editRecord({
      firstName: generalData.personNew.firstName,
      lastName: generalData.personNew.lastName,
    });
    await playgroundPage.getTableRowAndCollumnText(
      1,
      0,
      generalData.personNew.firstName
    );
    await playgroundPage.getTableRowAndCollumnText(
      1,
      1,
      generalData.personNew.lastName
    );
  });

  test("TC - 03", async ({ brokenImagesPage }) => {
    await brokenImagesPage.navigateToBrokenImages();
    await brokenImagesPage.validateBrokenImage();
  });

  test("TC - 04", async ({ practiceForms }) => {
    await practiceForms.navigateToPracticeForms();
    await practiceForms.fillForm({});
  });

  test("TC - 05", async ({ progressBar }) => {
    await progressBar.validateProgress();
  });

  test("TC - 06", async ({ hoverPage }) => {
    await hoverPage.validateTooltip();
  });

  test("TC - 07", async ({ dragAndDrop }) => {
    await dragAndDrop.moveItem();
  });
});
