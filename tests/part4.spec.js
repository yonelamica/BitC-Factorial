import { test, expect } from '@playwright/test';

/**
 * Part 4 — Additional Automation Tests
 * Factorial Calculator: http://qainterview.pythonanywhere.com
 *
 * These three scenarios are kept separate from the main Part 3 suite
 * as required by the assessment brief:
 *
 *  1. A test for form validation styling
 *  2. A test for the factorial of 12, including the expected result
 *  3. A test to verify that the API call is made with the correct headers and parameters
 */

// ─── SCENARIO 1: Form Validation Styling ─────────────────────────────────────
/**
 * Requirement: A test for form validation styling.
 * When the form is submitted without input, the input field border
 * should turn red (rgb(255, 0, 0)) to indicate a validation error.
 */
test('validation styling - input border turns red on empty submit', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');

  // Submit form without entering any value
  await page.click('#getFactorial');

  const input = page.locator('#number');

  // Assert that the input border colour changes to red
  await expect(input).toHaveCSS('border-color', 'rgb(255, 0, 0)');
});

// ─── SCENARIO 2: Factorial of 12 ─────────────────────────────────────────────
/**
 * Requirement: A test for the factorial of 12, including the expected result.
 * 12! = 479001600
 */
test('factorial of 12 returns 479001600', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');

  await page.fill('#number', '12');
  await page.click('#getFactorial');

  // Assert the result displays the correct factorial value
  // Expected: 12! = 479001600
  await expect(page.locator('#resultDiv')).toContainText('479001600');
});

// ─── SCENARIO 3: API Request Verification ────────────────────────────────────
/**
 * Requirement: A test to verify that the API call is made with the
 * correct headers and parameters.
 *
 * Verifies:
 * - Request method is POST
 * - POST body contains the correct parameter (number=5)
 * - Content-Type header is application/x-www-form-urlencoded
 * - Response status is 200 OK
 */
test('API request verification - correct method, headers and parameters', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');

  // Set up request and response listeners BEFORE triggering the action
  const requestPromise = page.waitForRequest(req =>
    req.url().includes('factorial') && req.method() === 'POST'
  );

  const responsePromise = page.waitForResponse(res =>
    res.url().includes('factorial')
  );

  await page.fill('#number', '5');
  await page.click('#getFactorial');

  const request = await requestPromise;
  const response = await responsePromise;

  // Verify request method
  expect(request.method()).toBe('POST');

  // Verify POST body contains correct parameter
  const postData = request.postData();
  expect(postData).toContain('number=5');

  // Verify Content-Type header is correct for form submission
  const headers = request.headers();
  expect(headers['content-type']).toContain('application/x-www-form-urlencoded');

  // Verify server responds with 200 OK
  expect(response.status()).toBe(200);
});