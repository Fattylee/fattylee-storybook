const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.lauch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
})

afterEach(async () => {
  await browser.close();
})

const run = async () => {
  test('the header brand has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  expect(text).toEqual('Abu Adnaan');
  });
  
  
  
  
};

run();