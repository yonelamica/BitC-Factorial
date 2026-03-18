import { test, expect } from '@playwright/test';

// Form validation Styling
test('validation styling', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.click('#getFactorial');

  const input = page.locator('#number');

  // Wait until border turns red
  await expect(input).toHaveCSS('border-color', 'rgb(255, 0, 0)');
});

// Test for factorial of 12, including the expected result
test('factorial of 12', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
  await page.fill('#number', '12');
  await page.click('#getFactorial');

  await expect(page.locator('#resultDiv')).toContainText('479001600');
});

// API Request Test
test('API request verification', async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');

  // Create request promise BEFORE action
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

  // Verify request
  expect(request.method()).toBe('POST');

  const postData = request.postData();
  expect(postData).toContain('number=5');

  const headers = request.headers();
  expect(headers['content-type']).toContain('application/x-www-form-urlencoded');

  // Verify response
  expect(response.status()).toBe(200);
});