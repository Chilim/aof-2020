const fs = require('fs');
const input = fs.readFileSync('day-10/input.txt', 'utf-8');
const outputs = input.split(/\n/).filter(Boolean).map(Number);

const getJoltsOutputs = (outputs) => {
  const sorted = outputs.sort((a, b) => a - b);
  return [0, ...sorted, sorted[sorted.length - 1] + 3]; // 0 for outlet, max + 3 for built-in adapter
}

const getJoltDiffsList = (joltsOutputs) => {
 return joltsOutputs.reduce((acc, current, idx) => {
   if (idx === joltsOutputs.length - 1) {
     return acc;
   }
   const next = joltsOutputs[idx + 1];
   return [...acc, next - current];
 }, []);
}

const getMultiplication = (outputs) => {
  const joltsOutputs = getJoltsOutputs(outputs);
  const diffs = getJoltDiffsList(joltsOutputs);
  const countOne = diffs.filter((diff) => diff === 1).length;
  const countThree = diffs.filter((diff) => diff === 3).length;
  return countOne * (countThree);
}

const getCombinations = (outputs) => {
  const joltsOutputs = getJoltsOutputs(outputs);
  const length = joltsOutputs.length - 1;
  const paths = new Array(length).fill(0);
  paths[length] = 1;
  for (let i = length - 1; i >= 0; i -= 1) {
    let count = 0;
    const current = joltsOutputs[i];
    for (let j = 1; j < 4; j += 1) {
      let next = current + j;
      if (joltsOutputs.includes(next)) {
        count += paths[joltsOutputs.indexOf(next)];
      }
    }
    paths[i] = count;
  }
  return paths[0];
}
console.log('Task 1: ', getMultiplication(outputs))
console.log('Task 2', getCombinations(outputs));
