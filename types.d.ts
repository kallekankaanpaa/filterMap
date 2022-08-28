type FilterFunction<Element> = (element: Element, index: number, array: Element[]) => boolean;
type MapFunction<Element, Output> = (element: Element, index: number, array: Element[]) => Output;