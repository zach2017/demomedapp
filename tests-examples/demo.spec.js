
import  { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://localhost:3000');
});


test.describe('New Todo', () => {
  test('should See Login', async ({ page }) => {
    expect("foo")
  });

})

