import { test } from "../../modules/base/pomFixture";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

test.describe("API scenarios", () => {
  test("Register API - possitve", async ({ registerAPI }) => {
    await registerAPI.post({});
  });

  test("Register API - negative", async ({ registerAPI }) => {
    await registerAPI.post({ userName: "", statusCode: 400 });
  });
});
