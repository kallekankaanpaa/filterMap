import Benchmark from "benchmark";
import { filterMap } from "./index.js";

const randomNumbers = (length: number): number[] => {
  const array = new Array(length);
  return array.fill(0).map(() => Math.random() * 5);
};

const inputs = [
  { name: "Empty array", data: [] },
  { name: "Small array", data: randomNumbers(10) },
  { name: "Medium array", data: randomNumbers(1000) },
  { name: "Big array", data: randomNumbers(100000) },
  { name: "Huge array", data: randomNumbers(10000000) },
  { name: "Everything gets filtered", data: randomNumbers(10000).map((n) => n + 5) },
  { name: "Nothing gets filtered", data: randomNumbers(10000).map((n) => Math.sqrt(n)) }
];


for (const { name, data } of inputs) {
  const suite = new Benchmark.Suite(name);

  suite.add("filterMap", function () {
    filterMap(data, (n) => n <= 5, (n) => n ** 2);
  }).add("reduce&push", function () {
    data.reduce((result, n) => n <= 5 ? (result.push(n ** 2) && result) as number[] : result, [] as number[]);
  });

  // Disable the less performant benchmarks when array length increases
  if (data.length <= 10000) {
    suite.add("reduce&concat", function () {
      data.reduce((result, n) => n <= 5 ? result.concat(n ** 2) : result, [] as number[]);
    }).add("reduce&spread", function () {
      data.reduce((result, n) => [...result, ...n <= 5 ? [n] : []], [] as number[]);
    }).add("flatMap", function () {
      data.flatMap((n) => n <= 5 ? [n ** 2] : []);
    }).add("filter+map", function () {
      data.filter((n) => n <= 5).map((n) => n ** 2);
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


