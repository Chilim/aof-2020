const fs = require("fs");

const input = fs.readFileSync("day-6/input.txt", "utf-8");
const groups = input.split(/\n\n/).map((group) => group.split(/\n/));

const countUniqueYes = (group) => {
  const set = group.reduce((acc, questions) => {
    [...questions].forEach((q) => acc.add(q));
    return acc;
  }, new Set());
  return [...set].length;
};

const countConsentYes = (group) => {
  const mapped = group.reduce((acc, questions) => {
    [...questions].forEach((q) =>
      acc.has(q) ? acc.set(q, acc.get(q) + 1) : acc.set(q, 1)
    );
    return acc;
  }, new Map());

  return [...mapped].reduce(
    (acc, [, val]) => (val === group.length ? (acc += 1) : acc),
    0
  );
};

const task1 = groups.reduce((acc, group) => (acc += countUniqueYes(group)), 0);

const task2 = groups.reduce((acc, group) => (acc += countConsentYes(group)), 0);

console.log(task1);
console.log(task2);
