import { test } from "../../modules/base/pomFixture";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

let allBooks;
let userData;

test.describe.configure({ mode: "serial" });
test.describe("API scenarios - books", () => {
  test.beforeAll(async ({ booksAPI, loginAPI }) => {
    // get all books for tests
    let booksData = await booksAPI.get({});
    // login user and get user data
    await loginAPI.authorize({});
    await loginAPI.post({});
    userData = await loginAPI.login({});

    // make books format accessible to next tests
    allBooks = booksData.books.map((book) => ({ isbn: book.isbn }));
  });

  test("Post Book to user profile", async ({ booksAPI }) => {
    await booksAPI.post({ userData, collectionOfIsbns: allBooks });
  });

  test("Post Book to user profile - negative", async ({ booksAPI }) => {
    await booksAPI.post({
      userData,
      collectionOfIsbns: [{ isbn: "invalidISBN" }],
      statusCode: 400,
    });
  });

  test("Delete all Books from user profile", async ({ booksAPI }) => {
    for await (const book of allBooks) {
      await booksAPI.delete({ userData, isbn: book.isbn });
    }
  });

  test("Delete all Books from user profile - negative, try to delete books that are not in the inventory", async ({
    booksAPI,
  }) => {
    for await (const book of allBooks) {
      await booksAPI.delete({ userData, isbn: book.isbn, statusCode: 400 });
    }
  });
});
