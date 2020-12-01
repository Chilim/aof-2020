const fs = require("fs");

const txt = fs.readFileSync("day-1/puzzles.txt", "utf-8");
const puzzles = txt.split(/\n/).map(Number);

const querySum = 2020;
let answer;

for (let i = 0; i < puzzles.length; i += 1) {
  for (let j = i + 1; j < puzzles.length; j += 1) {
    if (puzzles[i] + puzzles[j] === querySum) {
      answer = puzzles[i] * puzzles[j];
      break;
    }
    continue;
  }
}

if (answer) {
  console.log(answer);
}
