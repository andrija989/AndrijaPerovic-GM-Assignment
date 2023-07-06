import { expect, request } from "@playwright/test";

export class BooksAPI {
  async get({ statusCode = 200 }) {
    const apiContext = await request.newContext();
    const response = await apiContext.get(
      `${process.env.BASE_API}BookStore/v1/Books`
    );
    expect(response.status()).toEqual(statusCode);
    if (statusCode === 200) {
      const responseJSON = await response.json();
      return responseJSON;
    }
  }

  async post({
    userData,
    userId = userData.userId,
    collectionOfIsbns = [{ isbn: "9781449331818" }],
    statusCode = 201,
  }) {
    const apiContext = await request.newContext();
    const response = await apiContext.post(
      `${process.env.BASE_API}BookStore/v1/Books`,
      {
        data: {
          userId,
          collectionOfIsbns,
        },
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    expect(response.status()).toEqual(statusCode);
    if (statusCode === 201) {
      const responseJSON = await response.json();

      return responseJSON;
    }
  }

  async delete({
    userData,
    userId = userData.userId,
    isbn = "",
    statusCode = 204,
  }) {
    const apiContext = await request.newContext();
    const response = await apiContext.delete(
      `${process.env.BASE_API}BookStore/v1/Book`,
      {
        data: {
          userId,
          isbn: isbn,
        },
        headers: {
          Authorization: `Bearer ${userData.token}`,
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
