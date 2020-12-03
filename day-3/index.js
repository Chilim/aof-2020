const fs = require("fs");

const data = fs.readFileSync("day-3/input.txt", "utf-8");
const grid = data.split(/\n/);

const isTree = (char) => char === "#";

const getTreeCount = (grid, right, down) => {
  let treeCount = 0;
  const leapX = right;
  const leapY = down;
  let index = 0;

  for (let i = 0; i < grid.length; i += leapY) {
    const row = grid[i];
    const remain = index % row.length;
    if (isTree(row[remain])) {
      treeCount += 1;
    }
    index += leapX;
  }

  return treeCount;
};

const task1 = () => getTreeCount(grid, 3, 1);
const task2 = () => {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const treeList = slopes.map(([right, down]) =>
    getTreeCount(grid, right, down)
  );
  return treeList.reduce((acc, treeCount) => (acc *= treeCount), 1);
};

console.log(task1());
console.log(task2());
