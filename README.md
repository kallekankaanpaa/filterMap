# filterMap

Fast filterMap implementation

## Performance

This implementation performs very well on large arrays. The edge cases where reduce based filtermapping is faster are:
1. Empty or small (~10 elements) arrays
2. Arrays where all (or most) elements will get filtered