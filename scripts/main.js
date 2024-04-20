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
