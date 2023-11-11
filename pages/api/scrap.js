
// pages/api/twitter-follower-count.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { chromium } from 'playwright';

async function scrapeTwitterFollowerCount() {
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  });

  const page = await context.newPage();

  try {
    await page.setViewportSize({ width: 1366, height: 768 });

    await page.goto('https://livecounts.io/embed/twitter-live-follower-counter/Thotsem22', { waitUntil: 'domcontentloaded', timeout: 0 });

    await page.waitForTimeout(5000);

    const followerCount = await page.evaluate(() => {
      const followerCountElements = Array.from(document.querySelectorAll('.odometer-value')).slice(0, 9);
      return followerCountElements.map(element => element.textContent).join('');
    });

    console.log(`Twitter Follower Count: ${followerCount}`);

    return followerCount;
  } catch (error) {
    console.error('Error:', error);
    return null;
  } finally {
    // Close the browser
    await browser.close();
  }
}

export default async function handler(req, res) {
  try {
    const followerCount = await scrapeTwitterFollowerCount();

    if (followerCount !== null) {
      // You can respond with the follower count or do something else with the data
      res.status(200).json({ followerCount });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
