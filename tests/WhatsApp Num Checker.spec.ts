import {test, expect, chromium} from '@playwright/test';
import fs, { readFileSync } from 'fs';
import { logOut } from '../helper/helper';
import { ReadLine } from 'readline';
import { Readline } from 'readline/promises';


test('test', async ({}) => {
    test.setTimeout(0);
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();


  // go to whatsapp and log in
  await page.goto('https://web.whatsapp.com/');

  // click new chat
  await page.getByRole('paragraph').click();
  await page.getByRole('button', { name: 'New chat' }).click();
  await page.getByRole('textbox', { name: 'Search name or number' }).getByRole('paragraph').click();

  // search box to type number
  const searchBox = page.getByRole('textbox', { name: 'Search name or number' });   
  
  // cancel button to clear search box
  const cancelButton = page.getByRole('button', { name: 'Cancel search' });  

  
  // reading numbers from txt file
  const numbers = fs.readFileSync('numbers.txt', 'utf-8').split('\n');


// checking all numbers
for (let number of numbers){
    
    // trim spaces from line and paste to search box
    await searchBox.fill(number.trim());   
      
    try{
      
      await page.getByText(/^No results found for/).waitFor({state: 'visible', timeout:5000});
      let result = number.trim() + ' - unavailable ❌\n'

      fs.appendFileSync ('checked.txt', result)
    }
      catch{
      let result = number.trim() + ' - available ✅\n'
      fs.appendFileSync ('checked.txt', result)
    }

    //clear the search area
    await cancelButton.click(); 
    }

console.log('Process finished.');

// log - out function
logOut(page);


// await page.pause();
// await 
context.close();
// await 
browser.close();
});


