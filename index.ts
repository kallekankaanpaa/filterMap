import { DEFAULT_THRESHOLD as THRESHOLD } from "./constants.js";

type FilterFunction<Element> = (element: Element, index: number, array: Element[]) => boolean;
type MapFunction<Element, Output> = (element: Element, index: number, array: Element[]) => Output;

const filterMap_LONG = <Element, Output>(
  array: Element[],
  filter: FilterFunction<Element>,
  map: MapFunction<Element, Output>,
): Output[] => {
  const arrayLength = array.length;
  const result = new Array<Output>(arrayLength);
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

const filterMap_SHORT = <Element, Output>(
  array: Element[],
  filter: FilterFunction<Element>,
  map: MapFunction<Element, Output>
): Output[] => {
  const arrayLength = array.length;
  const result = new Array(0);
  let index = 0;
  while (index < arrayLength) {
    const element = array[index];
    if (filter(element, index, array)) {
      result.push(map(element, index, array));
    }
    index++;
  }
  return result;
};

const filterMap = <Element, Output>(
  array: Element[],
  filter: FilterFunction<Element>,
  map: MapFunction<Element, Output>
): Output[] => array.length > THRESHOLD ? filterMap_LONG(array, filter, map) : filterMap_SHORT(array, filter, map);


export default filterMap;