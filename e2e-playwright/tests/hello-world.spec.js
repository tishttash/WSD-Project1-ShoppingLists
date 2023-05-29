const { test, expect } = require("@playwright/test");

// test("Server responds with the text 'Hello world!'", async ({ page }) => {
//   const response = await page.goto("/");
//   expect(await response.text()).toBe("Hello world!");
// });

test("Main page has expected title and headings.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator("h1")).toHaveText("Lists");
});

test("Can open lists page.", async ({ page }) => {
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator("input[type=submit]").click();
  await page.locator(`a >> text='${listName}'`).click();
  await expect(page.locator("h1")).toHaveText(listName);
});