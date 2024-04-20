import * as Document from './modules/document.js';
import * as Events from './modules/events.js';
import {isNull} from './modules/object.js';

const root = Document.get('root');
const groups = Document.queryAll('.group');
const stacks = Document.queryAll('.stack');
const items = Document.queryAll('.item');

console.log(root);
console.log(groups);
console.log(stacks);
console.log(items);

// FOR ITEMS

items.forEach(item =>
{
    item.addEventListener('dragstart', () => Events.dragStart(item, 'item'))
    item.addEventListener('dragend', () => Events.dragEnd(item, 'item'))
})

stacks.forEach(stack =>
{
    stack.addEventListener('dragover', event => Events.dragOver(stack, 'item', event));
})

// FOR GROUPS

groups.forEach(group =>
{
    const summary = group.querySelector('summary');

    summary.addEventListener('dragstart', () => Events.dragStart(group, 'group'));
    summary.addEventListener('dragend', () => Events.dragEnd(group, 'group'));
});

root.addEventListener('dragover', event => Events.dragOver(root, 'group', event));




const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Замените 'USER_ID' на ID пользователя, чьи подписки вы хотите получить
  const userId = 'USER_ID';
  const url = `https://www.youtube.com/channel/${userId}/subscriptions`;

  await page.goto(url);
  await page.waitForSelector('ytd-grid-renderer');

  // Получаем список подписок
  const subscriptions = await page.evaluate(() => {
    const subscriptionElements = document.querySelectorAll('ytd-grid-renderer ytd-grid-video-renderer');
    const subscriptions = [];
    subscriptionElements.forEach(element => {
      const titleElement = element.querySelector('#video-title');
      const title = titleElement ? titleElement.innerText : '';
      const url = titleElement ? titleElement.href : '';
      subscriptions.push({ title, url });
    });
    return subscriptions;
  });

  console.log(subscriptions);

  await browser.close();
})();
