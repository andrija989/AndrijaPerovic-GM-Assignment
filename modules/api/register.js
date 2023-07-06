import { expect, request } from "@playwright/test";
import helpers from "../../helpers/dataGenerator";

export class RegisterAPI {
  async post({
    userName = helpers.randomStringGenerator(10),
    password = helpers.randomPassword(10),
    statusCode = 201,
  }) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(
      `${process.env.BASE_API}Account/v1/User`,
      {
        data: {
          userName,
          password,
        },
      }
    );
    expect(response.status()).toEqual(statusCode);
    if (statusCode === 201) {
      const responseJSON = await response.json();

      return responseJSON;
    }
  }
}
