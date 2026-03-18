import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://qainterview.pythonanywhere.com/');
});

test('factorial of 5', async ({ page }) => {
  await page.fill('#number', '5');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('120');
});

test('factorial of 12', async ({ page }) => {
  await page.fill('#number', '12');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('479001600');
});

test('negative input should show error', async ({ page }) => {
  await page.fill('#number', '-5');
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});

test('extremely large number should show validation', async ({ page }) => {
  await page.fill('#number', '77777777777');
  await page.click('#getFactorial');
  const result = page.locator('#resultDiv');
  await expect(result).toContainText('Number too large');
});

test('blank input validation', async ({ page }) => {
  await page.click('#getFactorial');
  await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
});

test('form validation styling', async ({ page }) => {
  await page.click('#getFactorial');
  const borderColor = await page.locator('#number').evaluate(el => getComputedStyle(el).borderColor);
  expect(borderColor).toBe('rgb(255, 0, 0)');
});