// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');

const validPhone = (num) => !isNaN(num) && num.length === 10;

const formTest = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        page.on('request', (req) => {
            if (req.url().includes('thank-you')) {
                console.log('Form data submitted:', req.url());
            }
        });

        await page.goto('https://testsite.getjones.com/ExampleForm/');

        const entryData = {
            '#name': 'John S',
            '#email': 'johns@getjones.com',
            '#phone': '0123456789',
            '#company': 'Jones Software.',
            '#employees': '51-500'
        };

        if (!validPhone(entryData['#phone'])) throw new Error('Invalid phone number');

        // Fill form based on the data object
        for (const selector in entryData) {
            const value = entryData[selector];
            // Handling special input types
            if (selector === '#employees') {
                await page.select(selector, value);
            } else {
                await page.type(selector, value);
            }
        }

        await page.screenshot({ path: 'pre_submit.png' });
        await page.click('button.primary');

        // Tests confirming successful submission
        await page.waitForNavigation();
        await page.screenshot({ path: 'post_submit.png' });
        const pageContent = await page.content();
        if (!pageContent.includes('Thank You')) {
            throw new Error('Form was submitted, though not successfully.');
        }


    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await browser.close();
    }
};

formTest();
