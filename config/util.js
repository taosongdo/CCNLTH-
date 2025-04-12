export const replaceItem = (arr, key, value, newItem) => {
    return arr.map(item => (item[key] === value ? newItem : item));
}
export const deleteItem = (arr, key, value) => {
    return arr.filter((item) => item[key] !== value);
}