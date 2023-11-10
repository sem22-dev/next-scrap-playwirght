
// Import necessary modules
import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

// Export the Get function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  try {
    await page.goto('https://livecounts.io/embed/twitter-live-follower-counter/Thotsem22');
    
    await page.waitForTimeout(5000);

    const followerCount = await page.evaluate(() => {
      const followerCountElements = Array.from(document.querySelectorAll('.odometer-value')).slice(0, 9);
      return followerCountElements.map(element => element.textContent).join('');
    });

    console.log(`Twitter Follower Count: ${followerCount}`);

    // Respond with the follower count or do something with the data
    res.status(200).json({ followerCount });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the browser
    await browser.close();
  }
}
