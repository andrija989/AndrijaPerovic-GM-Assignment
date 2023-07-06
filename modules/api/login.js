import { expect, request } from "@playwright/test";

export class LoginAPI {
  async post({
    userName = process.env.USER,
    password = process.env.PASSWORD,
    statusCode = 200,
  }) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(
      `${process.env.BASE_API}Account/v1/GenerateToken`,
      {
        data: {
          userName,
          password,
        },
      }
    );

    expect(response.status()).toEqual(statusCode);
    if (statusCode === 200) {
      const responseJSON = await response.json();

      return responseJSON;
    }
  }

  async authorize({
    userName = process.env.USER,
    password = process.env.PASSWORD,
    statusCode = 200,
  }) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(
      `${process.env.BASE_API}Account/v1/Authorized`,
      {
        data: {
          userName,
          password,
        },
      }
    );

    expect(response.status()).toEqual(statusCode);
    if (statusCode === 200) {
      const responseJSON = await response.json();

      return responseJSON;
    }
  }

  async login({
    userName = process.env.USER,
    password = process.env.PASSWORD,
    statusCode = 200,
  }) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(
      `${process.env.BASE_API}Account/v1/Login`,
      {
        data: {
          userName,
          password,
        },
      }
    );

    expect(response.status()).toEqual(statusCode);
    if (statusCode === 200) {
      const responseJSON = await response.json();

      return responseJSON;
    }
  }
}
