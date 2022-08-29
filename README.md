# filterMap

Fast filterMap implementation

## Usage

``` typescript
import filterMap from "filterMap"

const data = [
    { name: "John", age: 42 }, 
    { name: "Alex", age: 16 }, 
    { name: "Jill", age: 37 }
];

filterMap(data, ({age}) => age >= 18, ({name}) => name); // ["John", "Jill"]
```

### as Array.prototype

``` typescript
import filterMap from "filterMap"

Array.prototype.filterMap = function (filter, map) {
    return filterMap(this, filter, map);
}
```
This allows you to use filterMap like any other Array function e.g.
``` typescript
const data = [
    { name: "John", age: 42 }, 
    { name: "Alex", age: 16 }, 
    { name: "Jill", age: 37 }
];

data.filterMap(({age}) => age >= 18, ({name}) => name); // ["John", "Jill"]
```

## Performance

This implementation is performant on all array lengths, but the longer the input array is the more it beats reduce based implementations.
The only edge case I've found are long arrays where most or all elements get filtered.

### Benchmarks
The repository contains benchmarks which can be run with the `bench` script.

These benchmarks compare the current implementation of `filterMap` to various other methods of filtering and mapping in various different circumstances.

## License

This project is licensed under the MIT license 