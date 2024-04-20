import * as Document from './modules/document.js';
import * as Events from './modules/events.js';
import {isNull} from './modules/object.js';


Document.get('addItem').onclick = addItem;
Document.get('addGroup').onclick = addGroup;


function addItem()
{
    // Получаем имя нового элемента
    const name = Document.getValue('itemName');
    if (isNull(name)) return alert('Please enter an item name.');

    // Создаём новый элемент
    const item = Document.create('p');
    item.textContent = name;
    item.classList.add('item');
    item.setAttribute('draggable', 'true');

    // Добавляем обработчики событий
    item.addEventListener('dragstart', () => Events.dragStart(item, 'item'));
    item.addEventListener('dragend', () => Events.dragEnd(item, 'item'));

    // Добавляем созданный элемент в первую группу
    const defaultGroup = Document.query('#root details:first-of-type .stack');
    defaultGroup.appendChild(item);
}


function addGroup()
{
    // Получаем имя новой группы
    const name = Document.getValue('groupName');
    if (isNull(name)) return alert('Please enter a group name.');

    // Создаём новую группу
    const group = Document.create('details');
    group.setAttribute('open', 'true');
    group.classList.add('group');

    // Добавляем обработчики событий
    group.addEventListener('dragstart', () => Events.dragStart(group, 'group'));
    group.addEventListener('dragend', () => Events.dragEnd(group, 'group'));

    // Добавляем созданную группу в корень
    group.innerHTML = `<summary draggable = 'true'>${name}</summary><div class = 'stack'></div>`;
    root.appendChild(group);

    // Добавляем обработчики событий для стека
    const stack = group.querySelector('.stack');
    stack.addEventListener('dragover', event => Events.dragOver(stack, 'item', event));
}
