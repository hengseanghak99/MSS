import { test, expect } from '@playwright/test';
import exp from 'constants';

test.describe('Login Page',
  () => {
    test.describe('TCB_001 Case: Login form', () => {
      test('TCB_001 Case: Login form -English version', async ({ page }) => {
        await page.goto('https://mms-back.beniten.asia/login');
        await page.locator('.css-1hwfws3').click();
        await page.getByText('English', { exact: true }).click();
        await expect(page.getByText('iid Members System\'')).toBeVisible();
        await expect(page.getByText('Welcome back! Please login to')).toBeVisible();
        await expect(page.getByText('English')).toBeVisible();
        await expect(page.getByText('Term of use. Privacy policy')).toBeVisible();
      });
      test('TCB_001 Case: Login form -Japan version', async ({ page }) => {
        await page.goto('https://mms-back.beniten.asia/login');
        await expect(page.getByText('メディアメンバーシステム')).toBeVisible();
        await expect(page.getByText('お帰りなさい！アカウントにログインしてください。')).toBeVisible();
        await expect(page.getByText('日本語')).toBeVisible();
        await expect(page.getByText('利用規約・個人情報保護方針')).toBeVisible();
      });
    })
    test('TCB_002 Case: Login without input email & password', async ({ page }) => {
      await page.goto('https://mms-back.beniten.asia/login');
      await page.getByRole('button', { name: 'ログイン' }).click();
      await expect(page).toHaveURL('https://mms-back.beniten.asia/login');
     
    });
    test.describe('TCB_003 Case: Login with incorrect email & password', async () => {
      test('TCB_003 Case: Login with incorrect email & password -English version', async ({ page }) => {
        await page.goto('https://mms-back.beniten.asia/login');
        await page.locator('.css-1hwfws3').click();
        await page.getByText('English', { exact: true }).click();
        await page.getByPlaceholder('Email').fill('admin@beniten-api.comasdf');
        await page.getByPlaceholder('Password').fill('1234556677Aa');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('These credentials do not match our records.')).toBeVisible();
      });
      test('TCB_003 Case: Login with incorrect email & password -Japan version', async ({ page }) => {
        await page.goto('https://mms-back.beniten.asia/login');
        await page.getByPlaceholder('メール').fill('admin@beniten-api.comasdf');
        await page.getByPlaceholder('パスワード').fill('1234556677Aa');
        await page.getByRole('button', { name: 'ログイン' }).click();
        await expect(page.getByText('メールアドレスとパスワードが異なります')).toBeVisible();
      });
    });
    test('TCB_004 Case: Login with correct email & password (Registered)', async ({ page }) => {
        await page.goto('https://mms-back.beniten.asia/login');
        await page.getByPlaceholder('メール').fill('admin@beniten-api.com');
        await page.getByPlaceholder('パスワード').fill('_12345678^');
        await page.getByRole('button', { name: 'ログイン' }).click();
        await expect(page).toHaveURL('https://mms-back.beniten.asia/dashboard')
    });
    test('TCB_005 Case: Login with correct email and password (Unregistered)', async ({ page }) => {
    });
    test('TCB_006 Case: Login with only correct email (no password)', async ({ page }) => {
      await page.goto('https://mms-back.beniten.asia/login');
        await page.getByPlaceholder('メール').fill('admin@beniten-api.com');
        await page.getByPlaceholder('パスワード').fill('');
        await page.getByRole('button', { name: 'ログイン' }).click();
        await expect(page).toHaveURL('https://mms-back.beniten.asia/login')
    });
    test('Case: Login with incorrect email and correct password', async ({ page }) => {
    });
    test.describe('TCB_009 Case: Login with incorrect email format and correct password', async () => {
      test('Login with incorrect email format no `@`', async ({ page }) => {
        await page.goto('https://mms-back.beniten.asia/login');
        await page.locator('.css-1hwfws3').click();
        await page.getByText('English', { exact: true }).click();
        await page.getByPlaceholder('Email').fill('adminbeniten-api.com');
        await page.getByPlaceholder('Password').fill('1233234234');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://mms-back.beniten.asia/login');
      });
      test('Login with incorrect email format two dot `..com`', async ({ page }) => {
        await page.goto('https://mms-back.beniten.asia/login');
        await page.locator('.css-1hwfws3').click();
        await page.getByText('English', { exact: true }).click();
        await page.getByPlaceholder('Email').fill('adminbeniten-api..com');
        await page.getByPlaceholder('Password').fill('1233234234');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL('https://mms-back.beniten.asia/login');
      });
       
    });
    test('TCB_010 Case: Login with incorrect password and correct email', async ({ page }) => {
    });
    test.describe('TCB_011 Case: Login with correct email and password less then 8 & no Password Restrictions', async () => {
      test('TCB_011 Case: Case: Login with correct email and password less then 8 & no Password Restrictions --English version', async ({ page }) => {
        await page.goto('https://mms-back.beniten.asia/login');
        await page.locator('.css-1hwfws3').click();
        await page.getByText('English', { exact: true }).click();
        await page.getByPlaceholder('Email').fill('admin@beniten-api.com');
        await page.getByPlaceholder('Password').fill('123');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('The password must be at least 6 characters')).toBeVisible();
      });
       
      test('TCB_011 Case: Login with correct email and password less then 8 & no Password Restrictions --Japan Version', async ({ page }) => {
        await page.goto('https://mms-back.beniten.asia/login');
        await page.getByPlaceholder('メール').fill('admin@beniten-api.com');
        await page.getByPlaceholder('パスワード').fill('123');
        await page.getByRole('button', { name: 'ログイン' }).click();
        await expect(page.getByText('パスワードは少なくとも6文字である必要があります')).toBeVisible();
      });
    })
    });
