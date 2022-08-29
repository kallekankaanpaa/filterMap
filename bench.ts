import Benchmark from "benchmark";
import filterMap from "./index.js";
import { DEFAULT_THRESHOLD } from "./constants.js";

const randomNumbers = (length: number): number[] => {
  const array = new Array(length);
  return array.fill(0).map(() => Math.random() * 5);
};

const inputs = [
  { name: "Empty array", data: [] },
  { name: "Small array", data: randomNumbers(10) },
  { name: "Smedium array under threshold", data: randomNumbers(DEFAULT_THRESHOLD - 1) },
  { name: "Smedium array over threshold", data: randomNumbers(DEFAULT_THRESHOLD + 1) },
  { name: "Medium array", data: randomNumbers(1000) },
  { name: "Big array", data: randomNumbers(100000) },
  { name: "Huge array", data: randomNumbers(10000000) },
  { name: "Everything gets filtered", data: randomNumbers(10000).map((n) => n + 5) },
  { name: "Nothing gets filtered", data: randomNumbers(10000).map((n) => Math.sqrt(n)) }
];

const filter = (n: number) => n <= 5;
const map = (n: number) => n ** 2;

for (const { name, data } of inputs) {
  const suite = new Benchmark.Suite(name);

  suite.add("filterMap", function () {
    filterMap(data, filter, map);
  }).add("reduce&push", function () {
    data.reduce((result, n) => filter(n) ? (result.push(map(n)) && result) as number[] : result, [] as number[]);
  });

  // Disable the less performant benchmarks when array length increases
  if (data.length <= 10000) {
    suite.add("reduce&concat", function () {
      data.reduce((result, n) => filter(n) ? result.concat(map(n)) : result, [] as number[]);
    }).add("reduce&spread", function () {
      data.reduce((result, n) => [...result, ...filter(n) ? [map(n)] : []], [] as number[]);
    }).add("flatMap", function () {
      data.flatMap((n) => filter(n) ? [map(n)] : []);
    }).add("filter+map", function () {
      data.filter(filter).map(map);
    });
  }

  suite.on("start", function (this: Benchmark.Suite) {
    console.log(name);
  }).on("cycle", function (event: Benchmark.Event) {
    console.log(String(event.target));
  }).on("complete", function (this: Benchmark.Suite) {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  });

  suite.run();
}


