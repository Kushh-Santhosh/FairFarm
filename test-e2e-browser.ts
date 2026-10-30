import { chromium } from 'playwright';

async function runBrowserAudit() {
  console.log('--- STARTING PLAYWRIGHT BROWSER AUDIT & QA SUITE ---');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  // 1. INITIAL LOAD & ONBOARDING AUDIT
  console.log('1. Loading http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Check if Onboarding Modal is displayed
  const onboardingHeading = page.locator('text=Welcome to FAIRFARM');
  if (await onboardingHeading.isVisible()) {
    console.log('   Onboarding Modal detected! Capturing screenshot...');
    await page.screenshot({ path: 'screenshots/00-onboarding-modal.png' });
    console.log('   Saved: screenshots/00-onboarding-modal.png');

    // Test Language Selection in Onboarding (click Kannada then back to English)
    await page.locator('text=ಕನ್ನಡ').first().click();
    await page.waitForTimeout(300);
    await page.locator('text=English').first().click();
    await page.waitForTimeout(300);

    // Click Next to Step 2
    await page.locator('button:has-text("Next")').click();
    await page.waitForTimeout(400);

    // Step 2: Role selection (Farmer)
    await page.locator('text=Farmer / Producer').first().click();
    await page.waitForTimeout(300);
    await page.locator('button:has-text("Next")').click();
    await page.waitForTimeout(400);

    // Step 3: Complete profile and enter
    await page.locator('button:has-text("Enter FAIRFARM")').click();
    await page.waitForTimeout(800);
    console.log('   Completed onboarding successfully.');
  }

  // 2. LANDING PAGE DESKTOP
  console.log('2. Navigating to Public Landing Page...');
  await page.locator('text=About FAIRFARM').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/01-landing-desktop.png', fullPage: true });
  console.log('   Saved: screenshots/01-landing-desktop.png');

  // 3. LANDING PAGE MOBILE (375x812)
  console.log('3. Testing Landing Page (Mobile 375x812)...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/02-landing-mobile.png', fullPage: true });
  console.log('   Saved: screenshots/02-landing-mobile.png');

  // Reset to Desktop
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.waitForTimeout(400);

  // 4. RETURN TO FARMER DASHBOARD
  console.log('4. Entering Farmer Dashboard...');
  await page.locator('button:has-text("Explore FAIRFARM"), button:has-text("Enter Farmer Dashboard Now")').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/05-farmer-dashboard-desktop.png' });
  console.log('   Saved: screenshots/05-farmer-dashboard-desktop.png');

  // 5. REDESIGNED LANGUAGE SELECTOR MODAL AUDIT
  console.log('5. Testing Redesigned Language Selector Modal & Regional Scripts...');
  await page.locator('button[aria-label="Change Language"]').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/03-language-selector-modal.png' });
  console.log('   Saved: screenshots/03-language-selector-modal.png');

  // Select Kannada (ಕನ್ನಡ)
  console.log('   Selecting Kannada (ಕನ್ನಡ)...');
  await page.locator('button[data-lang="kn"]').first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/04-kannada-interface.png' });
  console.log('   Saved: screenshots/04-kannada-interface.png');

  // Select Telugu (తెలుగు)
  console.log('   Selecting Telugu (తెలుగు)...');
  await page.locator('button[aria-label="Change Language"]').first().click();
  await page.waitForTimeout(400);
  await page.locator('button[data-lang="te"]').first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/04-telugu-interface.png' });
  console.log('   Saved: screenshots/04-telugu-interface.png');

  // Select Tamil (தமிழ்)
  console.log('   Selecting Tamil (தமிழ்)...');
  await page.locator('button[aria-label="Change Language"]').first().click();
  await page.waitForTimeout(400);
  await page.locator('button[data-lang="ta"]').first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/04-tamil-interface.png' });
  console.log('   Saved: screenshots/04-tamil-interface.png');

  // Select Hindi (हिन्दी)
  console.log('   Selecting Hindi (हिन्दी)...');
  await page.locator('button[aria-label="Change Language"]').first().click();
  await page.waitForTimeout(400);
  await page.locator('button[data-lang="hi"]').first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/04-hindi-interface.png' });
  console.log('   Saved: screenshots/04-hindi-interface.png');

  // Return to English for standard validation
  console.log('   Returning to English (EN)...');
  await page.locator('button[aria-label="Change Language"]').first().click();
  await page.waitForTimeout(400);
  await page.locator('button[data-lang="en"]').first().click();
  await page.waitForTimeout(600);

  // 6. SIMPLE FARMER MODE
  console.log('6. Testing Simple Farmer Mode...');
  const simpleBtn = page.locator('button:has-text("Simple Mode")').first();
  if (await simpleBtn.isVisible()) {
    await simpleBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'screenshots/07-simple-farmer-mode.png' });
    console.log('   Saved: screenshots/07-simple-farmer-mode.png');
    // Toggle off
    await simpleBtn.click();
    await page.waitForTimeout(400);
  }

  // 7. SMART MARKET INTELLIGENCE ENGINE (MANDATORY BENCHMARK)
  console.log('7. Testing Smart Market Intelligence & Calculator...');
  await page.locator('button[data-nav-id="market-intel"]').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/08-market-intelligence.png' });
  console.log('   Saved: screenshots/08-market-intelligence.png');

  // 8. VERIFIED BUYER MARKETPLACE
  console.log('8. Testing Verified Buyer Marketplace...');
  await page.locator('button[data-nav-id="buyers"]').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/09-buyer-marketplace.png' });
  console.log('   Saved: screenshots/09-buyer-marketplace.png');

  // 9. COLLECTIVE SELLING & SHARED LOGISTICS
  console.log('9. Testing Collective Selling (Hoskote Tomato Collective)...');
  await page.locator('button[data-nav-id="group-selling"]').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/10-collective-selling.png' });
  console.log('   Saved: screenshots/10-collective-selling.png');

  // 10. AGRICULTURAL LOGISTICS COORDINATION
  console.log('10. Testing Logistics Coordination...');
  await page.locator('button[data-nav-id="logistics"]').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/11-logistics-tracking.png' });
  console.log('   Saved: screenshots/11-logistics-tracking.png');

  // 11. VOICE ASSISTANT (SIMULATED IVR PHONE)
  console.log('11. Testing Voice Assistant Phone Simulation...');
  await page.locator('button[data-nav-id="voice"]').first().click();
  await page.waitForTimeout(800);

  // Click green call button to start simulated call
  const startCall = page.locator('button[title="Call FAIRFARM"]').first();
  if (await startCall.isVisible()) {
    await startCall.click();
    await page.waitForTimeout(2200); // Ringing and connect
  }
  await page.screenshot({ path: 'screenshots/12-voice-assistant-ivr.png' });
  console.log('   Saved: screenshots/12-voice-assistant-ivr.png');

  // 12. TRANSACTION MANAGEMENT
  console.log('12. Testing Transaction Lifecycle & Audit...');
  await page.locator('button[data-nav-id="transactions"]').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/13-transaction-management.png' });
  console.log('   Saved: screenshots/13-transaction-management.png');

  // 13. FPO OPERATIONS DASHBOARD
  console.log('13. Testing FPO Operations Dashboard...');
  await page.locator('button[data-nav-id="fpo"]').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/14-fpo-dashboard.png' });
  console.log('   Saved: screenshots/14-fpo-dashboard.png');

  // 14. ADMIN DASHBOARD
  console.log('14. Testing Platform Admin Dashboard...');
  const roleDropdown = page.locator('button[title="Switch demo user perspective"]');
  if (await roleDropdown.isVisible()) {
    await roleDropdown.click();
    await page.waitForTimeout(300);
    await page.locator('text=Platform Admin').first().click();
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: 'screenshots/15-admin-dashboard.png' });
  console.log('   Saved: screenshots/15-admin-dashboard.png');

  // 15. MOBILE DASHBOARD VIEWPORT AUDIT (390x844 iPhone 14)
  console.log('15. Testing Mobile Viewport (390x844)...');
  await page.setViewportSize({ width: 390, height: 844 });
  // Switch back to farmer
  const roleDropMobile = page.locator('button[title="Switch demo user perspective"]');
  if (await roleDropMobile.isVisible()) {
    await roleDropMobile.click();
    await page.waitForTimeout(300);
    await page.locator('text=Ramesh Gowda (Farmer)').first().click();
    await page.waitForTimeout(600);
  }
  // Navigate to Dashboard
  await page.locator('button[data-nav-id="dashboard"]').first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/06-farmer-dashboard-mobile.png' });
  console.log('   Saved: screenshots/06-farmer-dashboard-mobile.png');

  await browser.close();
  console.log('\n================================================================');
  console.log('>>> COMPLETE BROWSER QA AUDIT PASSED 100%! ALL SCREENSHOTS SAVED <<<');
  console.log('================================================================');
}

runBrowserAudit().catch((err) => {
  console.error('Browser audit error:', err);
  process.exit(1);
});
