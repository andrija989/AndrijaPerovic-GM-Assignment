import { test } from "../../modules/base/pomFixture";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

test.describe("API scenarios - login", () => {
  test("Login TC - possitive", async ({ loginAPI }) => {
    await loginAPI.post({});
  });

  test("Login TC - negative", async ({ loginAPI }) => {
    await loginAPI.post({ userName: "", statusCode: 400 });
  });
});
