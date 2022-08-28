# filterMap

Fast filterMap implementation

## Usage

``` typescript
import filterMap from "filterMap"

const data = [
    { name: "John", age: 42 }, 
    { name: "Alex", age: 16 }, 
    { name: "Jill", age: 37 }
]

const result = filterMap(data, ({age}) => age >= 18, ({name}) => name);

console.log(result) // ["John", "Jill"]
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
]

const result = data.filterMap(({age}) => age >= 18, ({name}) => name)

console.log(result) // ["John", "Jill"]
```

## Performance

This implementation performs very well on large arrays. The edge cases where reduce based filtermapping is faster are:
1. Empty or small (~10 elements) arrays
2. Arrays where all (or most) elements will get filtered