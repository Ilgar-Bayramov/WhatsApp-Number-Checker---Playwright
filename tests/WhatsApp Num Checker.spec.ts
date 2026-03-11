import {test, expect, chromium} from '@playwright/test';
import fs from 'fs';
import { logOut } from '../helper/helper';


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

  // numbers array
  const numbers = ["+994506382941","+994509174623","+994501239874","+994508763219","+994505612398","+994511234876","+994517894321","+994510983274","+994513764829","+994516239845","+994101234567","+994104567892","+994107893214","+994109234786","+994108765432","+994551234987","+994559876321","+994553217894","+994558932147","+994554321876","+994991234567","+994998765432","+994997341289","+994996128734","+994995678123","+994701234987","+994708765321","+994703456128","+994709812734","+994704321987","+994771234876","+994779876123","+994773214598","+994778912347","+994774563219","+994601234987","+994608765321","+994603214789","+994607894123","+994604321876","+994509832174","+994501274983","+994508394721","+994506742198","+994505918273","+994512398741","+994519874321","+994517239845","+994514987321","+994516723498","+994107234981","+994104983217","+994101987234","+994108234765","+994109876123","+994553984217","+994559172834","+994554839217","+994556781239","+994558234971","+994991823746","+994995612389","+994998341276","+994996742189","+994997823461","+994709128347","+994702398741","+994708712349","+994704982371","+994701723498","+994771982347","+994775612398","+994774321987","+994778234561","+994772398741","+994601872349","+994607321498","+994604983217","+994608712394","+994603219874","+994508271394","+994501983247","+994509872134","+994506321987","+994505872349","+994517983241","+994512734981","+994514872319","+994519823471","+994516872349","+994107812349","+994101723498","+994104872391","+994108923471","+994109321874","+994551872349","+994554923871","+994558712394","+994553219874","+994559823471"];
  //checked array (push yes or no if it is available or not in whatsapp)
  const checked = []

const searchBox = page.getByRole('textbox', { name: 'Search name or number' });   // search box to type number
const cancelButton = page.getByRole('button', { name: 'Cancel search' });  // cancel button to clear search box

// checking all number of array
  for (let number of numbers){
    await searchBox.fill(number.toString()); 
      
    try{
      await page.getByText(/^No results found for/).waitFor({state: 'visible', timeout:5000});
      checked.push(number, '❌ No');
    }
      catch{
      checked.push(number, '✅ Yes');
    }

    await cancelButton.click(); //clear the search area
    }

console.log(checked);

// log - out
logOut(page);


await page.pause();
await context.close();
await browser.close();
});


