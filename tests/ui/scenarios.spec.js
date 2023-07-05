import { test } from "../../modules/base/pomFixture";
import generalData from "../../fixtures/generalData.json";

test.describe("UI scenarios", () => {
  test.beforeEach(async ({ homePage, general }) => {
    await general.visitPage("");
    await homePage.navigateToElements();
  });

  test("Scenario A", async ({ playgroundPage }) => {
    await playgroundPage.openTabels({});
    await playgroundPage.addNewRecord({});
  });

  test.only("Scenario B", async ({ playgroundPage }) => {
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
});
