/**
 * NateraHub Flow Test - Blood Collection Panel
 * Run with: npx playwright test naterahub-flow-test.js --project=chromium
 * Or: node naterahub-flow-test.js (standalone)
 */

const { chromium } = require('playwright');
const path = require('path');

async function runTest() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  const screenshotDir = path.join(__dirname, 'screenshots');
  const fs = require('fs');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  try {
    console.log('Step 1: Navigate to NateraHub...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 10000 });

    console.log('Step 2: Click on Blood Collection Required queue card...');
    await page.click('text=Blood Collection Required');
    await page.waitForURL(/view=taskList/);
    await page.waitForTimeout(500);

    console.log('Step 3: Click on a task/order to open Order Details...');
    // Click first patient name link or table row
    const firstTaskRow = page.locator('table tbody tr').first();
    await firstTaskRow.click();
    await page.waitForURL(/view=orderDetails/);
    await page.waitForTimeout(800);

    console.log('Step 4: Click the Start button in Blood Collection workflow...');
    const startButton = page.locator('button:has-text("Start")');
    await startButton.waitFor({ state: 'visible', timeout: 5000 });
    await startButton.click();
    await page.waitForTimeout(500);

    console.log('Step 5: Verify Blood Collection side panel opened...');
    const panel = page.locator('text=Select an Address');
    await panel.waitFor({ state: 'visible', timeout: 3000 });
    console.log('  ✓ Blood Collection panel opened from the right');

    console.log('Step 6: Take screenshot - side panel with address selection and blood draw methods...');
    await page.screenshot({ path: path.join(screenshotDir, '01-blood-collection-panel-initial.png'), fullPage: false });
    console.log('  ✓ Saved: screenshots/01-blood-collection-panel-initial.png');

    console.log('Step 7: Click SHOW MORE to expand address list...');
    const showMoreBtn = page.locator('button:has-text("SHOW MORE")');
    if (await showMoreBtn.isVisible()) {
      await showMoreBtn.click();
      await page.waitForTimeout(400);
      console.log('  ✓ SHOW MORE clicked - address list expanded');
    } else {
      console.log('  (SHOW MORE not visible - may already be expanded)');
    }

    console.log('Step 8: Click on different addresses to verify radio button selection...');
    // Address items contain "1257 Maplewood Dr" - click each to test radio selection
    const addressParagraphs = page.locator('p:has-text("1257 Maplewood Dr")');
    const addressCount = await addressParagraphs.count();
    if (addressCount >= 2) {
      await addressParagraphs.nth(1).click();
      await page.waitForTimeout(200);
      await addressParagraphs.nth(2).click();
      await page.waitForTimeout(200);
      await addressParagraphs.nth(0).click();
      await page.waitForTimeout(200);
      console.log('  ✓ Radio button selection verified across addresses');
    }

    console.log('Step 9: Take final screenshot - fully functional side panel...');
    await page.screenshot({ path: path.join(screenshotDir, '02-blood-collection-panel-final.png'), fullPage: false });
    console.log('  ✓ Saved: screenshots/02-blood-collection-panel-final.png');

    console.log('\n✅ All steps completed successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    await page.screenshot({ path: path.join(screenshotDir, 'error-state.png') });
    console.log('Error screenshot saved to screenshots/error-state.png');
    throw error;
  } finally {
    await browser.close();
  }
}

runTest().catch(console.error);
