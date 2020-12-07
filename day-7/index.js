const fs = require("fs");

const input = fs.readFileSync("day-7/input.txt", "utf-8");
const rules = input.split(/\n/);
const myColor = 'shiny gold';

// const getContainerColor = (rule) => rule.substring(0, rule.indexOf('bags')).trim();
// const colors = rules.map(rule => rule.substring(0, rule.indexOf('bags')).trim());


const bags = rules.reduce((acc, rule) => {
  const container = rule.substring(0, rule.indexOf('bags')).trim();
  const contents = rule.split(',').reduce((acc, chunk) => {
    if (!chunk.match(/\d/)) {
      return acc;
    }
    const bag = chunk.substring(chunk.indexOf(chunk.match(/\d/)) + 1, chunk.lastIndexOf('bag')).trim();
    return [...acc, bag];
  },[]); 
  return { ...acc, [container]: contents };
}, {});

const getContainerBags = (bags, searchBag) => {
  return Object.keys(bags).filter(key => bags[key].includes(searchBag));
};

const traverseBags = (bags, searchBag) => {
  const iter = (searchBags, acc = []) => {
    const containerBags = [];
    searchBags.forEach(bag => {
      containerBags.push(...getContainerBags(bags, bag));
    });
    if (!containerBags.length) {
      return acc;
    }
    return iter(containerBags, acc.concat(containerBags));
  }
  return iter([searchBag]);
};

const firstTask = () => {
  const containerBags = new Set(traverseBags(bags, myColor));
  return [...containerBags].length;
}

console.log(firstTask());