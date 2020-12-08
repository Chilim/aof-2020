const fs = require("fs");

const input = fs.readFileSync("day-7/input.txt", "utf-8");
const rules = input.split(/\n/);
const myColor = "shiny gold";

const bags = rules.reduce((acc, rule) => {
	const container = rule.substring(0, rule.indexOf("bags")).trim();
	const contents = rule.split(",").reduce((acc, chunk) => {
		const count = chunk.match(/\d/);
		if (!count) {
			return acc;
		}
		const color = chunk.substring(chunk.indexOf(count) + 1, chunk.lastIndexOf("bag")).trim();
		return [...acc, { color, count: +count[0] }];
	}, []);
	return { ...acc, [container]: contents };
}, {});

const getContainerBags = (bags, searchBag) =>
	Object.keys(bags).filter(key => bags[key].some(bag => bag.color === searchBag));

const getContainers = (bags, searchBag) => {
	const iter = (searchBags, acc = []) => {
		const containerBags = [];
		searchBags.forEach(bag => {
			containerBags.push(...getContainerBags(bags, bag));
		});
		if (!containerBags.length) {
			return acc;
		}
		return iter(containerBags, acc.concat(containerBags));
	};
	return iter([searchBag]);
};

const getBagsCount = (bags, color) => {
	let totalBags = 0;
	const iter = (color, acc) => {
		const innerBags = bags[color];
		let iterSum = 0;
		for (let innerBag of innerBags) {
			iterSum += innerBag.count * acc;
			iter(innerBag.color, acc * innerBag.count);
		}
		totalBags += iterSum;
	};
	iter(color, 1);
	return totalBags;
};

const firstTask = () => [...new Set(getContainers(bags, myColor))].length;
const secondTask = () => getBagsCount(bags, myColor);

console.log(firstTask());
console.log(secondTask());
