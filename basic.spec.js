const { test, expect } = require('@playwright/test');

test.describe('Digital Archivist Portal Tests', () => {
    let targetUrl;

    test.beforeAll(async () => {
        targetUrl = 'file://' + __dirname + '/index.html';
    });

    test('Test 1: Check page title is correct', async ({ page }) => {
        await page.goto(targetUrl);
        await expect(page).toHaveTitle('Digital Archivist | Institutional Portal');
    });

    test('Test 2: Check main header is visible', async ({ page }) => {
        await page.goto(targetUrl);
        const header = page.locator('h1', { hasText: 'Digital Archivist' });
        await expect(header).toBeVisible();
    });

    test('Test 3: Check subtitle is visible', async ({ page }) => {
        await page.goto(targetUrl);
        const subtitle = page.locator('p', { hasText: 'Institutional Command Center' });
        await expect(subtitle).toBeVisible();
    });

    test('Test 4: Check system status indicator', async ({ page }) => {
        await page.goto(targetUrl);
        const status = page.locator('span', { hasText: 'System Status: Optimal' });
        await expect(status).toBeVisible();
    });

    test('Test 5: Check authenticated user details', async ({ page }) => {
        await page.goto(targetUrl);
        const userName = page.locator('p', { hasText: 'Agrannya Singh' });
        const userRole = page.locator('p', { hasText: 'Super Administrator' });
        await expect(userName).toBeVisible();
        await expect(userRole).toBeVisible();
    });

    test('Test 6: Check page greeting', async ({ page }) => {
        await page.goto(targetUrl);
        const greeting = page.locator('h2', { hasText: 'Welcome Back, Archivist' });
        await expect(greeting).toBeVisible();
    });

    test('Test 7: Check Librarian Suite links', async ({ page }) => {
        await page.goto(targetUrl);
        const invLink = page.locator('a[href="assets/Librarian_Dashboard_Inventory/index.html"]');
        const mobileLink = page.locator('a[href="assets/Librarian_Dashboard_Mobile_Version/index.html"]');
        await expect(invLink).toBeVisible();
        await expect(mobileLink).toBeVisible();
    });

    test('Test 8: Check Finance & Accounts section', async ({ page }) => {
        await page.goto(targetUrl);
        const financeHeader = page.locator('h3', { hasText: 'Finance & Accounts' });
        const paymentLink = page.locator('a[href="assets/Accountant_Financial_Suite/index.html"]');
        await expect(financeHeader).toBeVisible();
        await expect(paymentLink).toBeVisible();
    });

    test('Test 9: Check Administration section', async ({ page }) => {
        await page.goto(targetUrl);
        const adminHeader = page.locator('h3', { hasText: 'Administration' });
        const healthLink = page.locator('a[href="assets/System_Admin_Infrastructure/index.html"]');
        await expect(adminHeader).toBeVisible();
        await expect(healthLink).toBeVisible();
    });

    test('Test 10: Check Community Portal section', async ({ page }) => {
        await page.goto(targetUrl);
        const portalHeader = page.locator('h3', { hasText: 'Community Portal' });
        const historyLink = page.locator('a[href="assets/Member_Discovery_History_Portal/index.html"]');
        const searchLink = page.locator('a[href="assets/Search_Discovery_Portal/index.html"]');
        await expect(portalHeader).toBeVisible();
        await expect(historyLink).toBeVisible();
        await expect(searchLink).toBeVisible();
    });

    test('Test 11: Check footer text', async ({ page }) => {
        await page.goto(targetUrl);
        const footerText = page.locator('footer', { hasText: 'Digital Archivist Suite v1.0.4 | Institution Security Protocols Active' });
        await expect(footerText).toBeVisible();
    });
});

test.describe('Responsive Tests', () => {
    let targetUrl;

    test.beforeAll(async () => {
        targetUrl = 'file://' + __dirname + '/index.html';
    });

    test('Test 12: System Status is hidden on mobile screens', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(targetUrl);
        
        // System status has hidden md:flex classes so it should be not visible on 375px
        const status = page.locator('div', { hasText: 'System Status: Optimal' }).first();
        await expect(status).toBeHidden();
    });

    test('Test 13: System Status is visible on desktop screens', async ({ page }) => {
        await page.setViewportSize({ width: 1024, height: 768 });
        await page.goto(targetUrl);
        
        const status = page.locator('div', { hasText: 'System Status: Optimal' }).first();
        // At desktop size, it should be visible
        await expect(status).toBeVisible();
    });

    test('Test 14: Username and Role are hidden on mobile screens', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto(targetUrl);
        
        // These text elements use hidden sm:block
        const userName = page.locator('p', { hasText: 'Agrannya Singh' });
        const userRole = page.locator('p', { hasText: 'Super Administrator' });
        
        await expect(userName).toBeHidden();
        await expect(userRole).toBeHidden();
    });

    test('Test 15: Username and Role are visible on desktop screens', async ({ page }) => {
        await page.setViewportSize({ width: 1024, height: 768 });
        await page.goto(targetUrl);
        
        const userName = page.locator('p', { hasText: 'Agrannya Singh' });
        const userRole = page.locator('p', { hasText: 'Super Administrator' });
        
        await expect(userName).toBeVisible();
        await expect(userRole).toBeVisible();
    });
});
