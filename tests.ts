import { assert } from "chai";
import filterMap from "./index.js";

describe('filterMap()', function () {
  const animals = ["crow", "cat", "dog", "lion", "cow", "pidgeon"];
  it('filters', function () {
    const result = filterMap(animals, (animal) => animal.length < 4, (animal) => animal);
    assert.deepEqual(result, ["cat", "dog", "cow"]);
  });
  it('maps', function () {
    const result = filterMap(animals, () => true, (animal) => animal.toUpperCase());
    assert.deepEqual(result, ["CROW", "CAT", "DOG", "LION", "COW", "PIDGEON"]);
  });
  it('filters and maps', function () {
    const result = filterMap(animals, (animal) => animal.length < 4, (animal) => animal.toUpperCase());
    assert.deepEqual(result, ["CAT", "DOG", "COW"]);
  });
});