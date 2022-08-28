export const filterMap = <E, O>(
  array: E[],
  filter: (element: E, index: number, array: E[]) => boolean,
  map: (element: E, index: number, array: E[]) => O
): O[] => {
  const arrayLength = array.length;
  const result: O[] = new Array(arrayLength);
  let index = 0;
  let outputI = 0;
  while (index < arrayLength) {
    const element = array[index];
    if (filter(element, index, array)) {
      result[outputI] = map(element, index, array);
      outputI++;
    }
    index++;
  }
  result.length = outputI;
  return result;
};

export default filterMap;