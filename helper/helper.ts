import { Page } from '@playwright/test';


// log out from whatsapp
export async function logOut (page: Page){
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();
    await page.getByLabel('Log out?').getByRole('button', { name: 'Log out' }).click();
}