export function get(id)
{
    return document.getElementById(id);
}

export function getValue(id)
{
    return get(id).value.trim();
}

export function create(name)
{
    return document.createElement(name);
}

export function query(name)
{
    return document.querySelector(name);
}

export function queryAll(name)
{
    return document.querySelectorAll(name);
}
