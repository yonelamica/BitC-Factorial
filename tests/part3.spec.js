import { test, expect } from '@playwright/test';

/**
 * Part 3 — Main Automation Test Suite
 * Factorial Calculator: http://qainterview.pythonanywhere.com
 *
 * Tests align with Part 2 test case documentation (TC01–TC26).
 * Known bugs are documented inline where the app does not behave as expected.
 * Part 4 scenarios (validation styling, factorial of 12, API verification)
 * are kept in part4.spec.js as required by the assessment brief.
 */

test.beforeEach(async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
});

// ─── VALID INPUT TESTS ────────────────────────────────────────────────────────

// TC01 — Valid integer input (5)
test('TC01 - factorial of 5 returns 120', async ({ page }) => {
  await page.fill('#number', '5');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('120');
});

// TC04 — Zero input should return 1
test('TC04 - factorial of 0 returns 1', async ({ page }) => {
  await page.fill('#number', '0');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('1');
});

// TC10 — Boundary: minimum valid positive input (1)
test('TC10 - factorial of 1 returns 1', async ({ page }) => {
  await page.fill('#number', '1');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('1');
});

// TC11 — Boundary: last valid input before overflow (170)
test('TC11 - factorial of 170 returns valid large number', async ({ page }) => {
  await page.fill('#number', '170');
  await page.click('#getFactorial');
  // 170! = 7.257415615307994e+306 — valid exponential result
  await expect(page.locator('#resultDiv')).toContainText('7.257415615307994e+306');
});

// ─── INPUT VALIDATION TESTS ───────────────────────────────────────────────────

// TC03 — Decimal input should show validation error
test('TC03 - decimal input shows validation error', async ({ page }) => {
  await page.fill('#number', '2.5');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});

// TC05 — Blank input should show validation error
test('TC05 - blank input shows validation error', async ({ page }) => {
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});

// TC15 — Alphabetic input should show validation error
test('TC15 - alphabetic input shows validation error', async ({ page }) => {
  await page.fill('#number', 'abc');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});

// TC16 — Special characters should show validation error
test('TC16 - special characters show validation error', async ({ page }) => {
  await page.fill('#number', '!@#$%');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});

// TC18 — Floating point that resembles integer (1.0) should show validation error
test('TC18 - floating point input 1.0 shows validation error', async ({ page }) => {
  await page.fill('#number', '1.0');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});

// TC19 — Negative decimal should show validation error
test('TC19 - negative decimal input shows validation error', async ({ page }) => {
  await page.fill('#number', '-1.5');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});

// TC20 — Copy-paste valid input should calculate correctly
test('TC20 - copy-paste input calculates correctly', async ({ page }) => {
  // Simulates paste by setting value directly and triggering input event
  await page.fill('#number', '5');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('120');
});

// TC21 — SQL injection input should show validation error
test('TC21 - SQL injection input shows validation error', async ({ page }) => {
  await page.fill('#number', '1; DROP TABLE');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});

// ─── KNOWN BUG TESTS (documenting actual app behaviour) ──────────────────────

/**
 * TC02 — KNOWN BUG (DEF-01): Negative input produces no response.
 * Expected: error message displayed.
 * Actual: result area remains empty — no feedback given.
 * Test documents actual (buggy) behaviour.
 */
test('TC02 - [BUG DEF-01] negative input produces no response', async ({ page }) => {
  await page.fill('#number', '-5');
  await page.click('#getFactorial');
  // BUG: app shows no response for negative numbers
  // Expected error: "Factorial is not defined for negative numbers"
  await expect(page.locator('#resultDiv')).toBeEmpty();
});

/**
 * TC12 — KNOWN BUG (DEF-02): Input 171 returns Infinity instead of error.
 * Expected: "Number too large to calculate"
 * Actual: "The factorial of 171 is: Infinity"
 */
test('TC12 - [BUG DEF-02] input 171 returns Infinity instead of error', async ({ page }) => {
  await page.fill('#number', '171');
  await page.click('#getFactorial');
  // BUG: should display controlled error, instead shows Infinity
  await expect(page.locator('#resultDiv')).toContainText('Infinity');
});

/**
 * TC14 — KNOWN BUG (DEF-03): Input >= 992 produces no response.
 * Expected: "Number too large to calculate"
 * Actual: result area remains empty — no feedback given.
 */
test('TC14 - [BUG DEF-03] input 992 produces no response', async ({ page }) => {
  await page.fill('#number', '992');
  await page.click('#getFactorial');
  // BUG: app shows no response for inputs >= 992
  await expect(page.locator('#resultDiv')).toBeEmpty();
});

/**
 * TC17 — KNOWN BUG (DEF-04): Whitespace-only input produces no response.
 * Expected: validation error displayed.
 * Actual: no response shown.
 */
test('TC17 - [BUG DEF-04] whitespace-only input produces no response', async ({ page }) => {
  await page.fill('#number', '   ');
  await page.click('#getFactorial');
  // BUG: whitespace input should be treated as blank and show a validation error
  await expect(page.locator('#resultDiv')).toBeEmpty();
});

// ─── UI & NAVIGATION TESTS ────────────────────────────────────────────────────

// TC21 — Page title should be "Factorial!"
test('TC22 - page title is correct', async ({ page }) => {
  await expect(page).toHaveTitle('Factorial!');
});

// TC23 — Copyright message should not show duplicate years
test('TC23 - [BUG DEF-07] copyright message shows duplicate year', async ({ page }) => {
  const copyright = page.locator('text=2026 - 2026');
  // BUG: copyright shows "2026 - 2026" — duplicate year range
  await expect(copyright).toBeVisible();
});

// TC24 — Terms and Conditions link should be present and functional
test('TC24 - Terms and Conditions link navigates successfully', async ({ page }) => {
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.click('text=Terms and Conditions')
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).not.toBe('');
});

// TC25 — Privacy link should be present and functional
test('TC25 - Privacy link navigates successfully', async ({ page }) => {
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.click('text=Privacy')
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).not.toBe('');
});

// TC26 — About link should be present and functional
test('TC26 - About link navigates successfully', async ({ page }) => {
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.click('text=About')
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).not.toBe('');
});