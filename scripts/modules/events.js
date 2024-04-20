/*
    Исходный код: https://github.com/WebDevSimplified/Drag-And-Drop/blob/master/script.js
    1. События заключены в отдельные функции
    2. Изменена подсказка при перетаскивании
    3. Добавлен параметр `name` - имя класса
    *. Позволяет создавать вложенную структуру
    *. Ошибки в консоли не влияют на работу кода
*/


import * as Document from './document.js';
import {isNull} from './object.js';


// Вызов на событии 'dragstart'
export function dragStart(item, name)
{
    item.classList.add(`${name}-drag`);
    item.style.opacity = 0.1;
}


// Вызов на событии 'dragend'
export function dragEnd(item, name)
{
    item.classList.remove(`${name}-drag`);
    item.style.opacity = 1;
}


// Вызов на событии 'dragover'
export function dragOver(container, name, event)
{
    event.preventDefault();
    const afterItem = getDragAfter(container, name, event.clientY);
    const item = Document.query(`.${name}-drag`);

    if (isNull(afterItem)) container.appendChild(item);
    else container.insertBefore(item, afterItem);
}


// Определяет следующий элемент
function getDragAfter(container, name, y)
{
    const items = [...container.querySelectorAll(`.${name}:not(.${name}-drag)`)];

    return items.reduce((closest, child) =>
    {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset)
        {
            return { offset: offset, element: child };
        }

        else return closest;

    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
