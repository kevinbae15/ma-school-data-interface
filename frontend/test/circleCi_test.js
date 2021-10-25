const assert = require('assert')
const puppeteer = require('puppeteer')

const TEST_URL = 'http://localhost:2999/'

describe('TEN Boilerplate Website', () => {
  let browser = null
  let page = null

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      timeout: 20000,
    })
    page = await browser.newPage()
  })

  afterEach(() => {
    browser.close()
  })

  it('sample test', async () => {
    // initialize page
    await page.goto(TEST_URL)

    assert.equal(true, true)
  })
})
