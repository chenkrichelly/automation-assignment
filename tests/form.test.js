const puppeteer = require('puppeteer');

describe('Form Submission Tests', () => {
    let browser;
    let page;

    // Launch browser and create a page at the beginning
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    // Close the browser at the end
    afterAll(async () => {
        await browser.close();
    });

    // Successful submission
    test('Submission with valid data', async () => {
        await page.goto('https://testsite.getjones.com/ExampleForm/');

        const entryData = {
            '#name': 'John S',
            '#email': 'johns@getjones.com',
            '#phone': '0123456789',
            '#company': 'Jones Software.',
            '#employees': '51-500',
        };

        // Fill the form
        for (const selector in entryData) {
            const value = entryData[selector];
            if (selector === '#employees') {
                await page.select(selector, value);
            } else {
                await page.type(selector, value);
            }
        }

        // Take a pre-submit screenshot
        await page.screenshot({ path: 'tests/pre_submit.png' });

        // Submit the form
        await page.click('button.primary');
        await page.waitForNavigation();

        // Check navigation to thank you page
        expect(page.url()).toContain('thank-you');

        // Check for successful submission text
        const content = await page.content();
        expect(content).toContain('Thank You');
        console.log('Form data submitted');


        // Take a post-submit screenshot
        await page.screenshot({ path: 'tests/post_submit.png' });
    });

    // invalid email test
    test('Submission with invalid data', async () => {
        await page.goto('https://testsite.getjones.com/ExampleForm/');
        // await page.goto('http://localhost:8000', { waitUntil: 'networkidle0' });

        const entryData = {
            '#name': 'John S',
            '#email': 'invalid-email', // Invalid email
            '#phone': '0123456789',
            '#company': 'Jones Software.',
            '#employees': '51-500',
        };

        for (const selector in entryData) {
            const value = entryData[selector];
            if (selector === '#employees') {
                await page.select(selector, value);
            } else {
                await page.type(selector, value);
            }
        }

        await page.click('button.primary');

        // Check if URL didn't change (therefor wasnt submitted)
        expect(page.url()).toBe('https://testsite.getjones.com/ExampleForm/');
    });
});
