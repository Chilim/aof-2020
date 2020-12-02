const fs = require("fs");

const data = fs.readFileSync("day-2/input.txt", "utf-8");
const dataToList = data.split(/\n/);
const entries = dataToList.map((item) => {
  const [repeat, char, password] = item.split(" ");
  return {
    repeat: repeat.split("-").map(Number),
    char: char.replace(/:/g, ""),
    password,
  };
});

const validPasswordsPart1 = entries.reduce((acc, entry) => {
  const { repeat, char, password } = entry;
  const regExp = new RegExp(char, "g");
  const match = password.match(regExp);
  if (!match) {
    return acc;
  }
  const [min, max] = repeat;
  const matchCount = match.length;
  return matchCount >= min && matchCount <= max ? (acc += 1) : acc;
}, 0);

const validPasswordsPart2 = entries.reduce((acc, entry) => {
  const { repeat, char, password } = entry;
  const [first, second] = repeat;
  const firstCharMatch = password[first - 1];
  const secondCharMatch = password[second - 1];

  return firstCharMatch === char && secondCharMatch !== char
    ? (acc += 1)
    : firstCharMatch !== char && secondCharMatch === char
    ? (acc += 1)
    : acc;
}, 0);

console.log(validPasswordsPart1);
console.log(validPasswordsPart2);
