/* eslint-disable no-console */
// then do one for the 4 top goal spaces (the function called will depend on the y axis)
export const getColumnToDrop = ({ x, view }: MouseEvent) => {
  const innerWidth = view?.innerWidth || 1080;

  const columnSizes = innerWidth / 7;
  const columnNumber = Math.ceil(x / columnSizes);

  return `column${columnNumber}Pile`;
};