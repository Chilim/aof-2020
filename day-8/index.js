const fs = require('fs');

const input = fs.readFileSync('day-8/input.txt', 'utf-8');
const instructions = input
	.split(/\n/)
	.map(instruction => instruction.split(' '))
	.map((arguments, idx) => ({
		index: idx,
		command: arguments[0],
		operator: arguments[1][0],
		value: +arguments[1].slice(1),
	}));

const accOperations = operator => {
	return {
		'+': (acc, val) => acc + val,
		'-': (acc, val) => acc - val,
	}[operator];
};

const instrsOperations = operator => {
	return {
		'+': (instrs, currentIndex, shiftIndex) => instrs.slice(currentIndex + shiftIndex),
		'-': (instrs, currentIndex, shiftIndex) => instrs.slice(currentIndex - shiftIndex),
	}[operator];
};

const getAccValue = (instructions) => {
	const iter = (instrs, tracker = [], acc = 0) => {
		if (instrs.length === 0) {
			return { acc, isWorking: true };
		}
		const [first, ...rest] = instrs;
		const { command, operator, value, index } = first;
		if (tracker.includes(index)) {
			return { acc, isWorking: false };
		}
		if (command === 'acc') {
			const newAcc = accOperations(operator)(acc, value);
			return iter(rest, tracker.concat(index), newAcc);
		}
		if (command === 'jmp') {
			const newInstrs = instrsOperations(operator)(instructions, index, value);
			return iter(newInstrs, tracker.concat(index), acc);
		}
		return iter(rest, tracker.concat(index), acc);
	};

	return iter(instructions);
};

const changeCommands = (instructions) => {
	const iter = (instrs, changeable, changer) => {
		if (instrs.length === 0 && changeable === 'nop') {
			return 'no solution found';
		}
		if (instrs.length === 0) {
			return iter(instructions, changer, changeable);
		}
		const [first, ...rest] = instrs;
		if (first.command === changeable) {
			first.command = changer;
			const { acc, isWorking } = getAccValue(instructions);
			if (isWorking) {
				return acc;
			}
			first.command = changeable;
			return iter(rest, changeable, changer);
		}
		return iter(rest, changeable, changer)
	}
	return iter(instructions, 'jmp', 'nop');
};
console.log("task 1: ", getAccValue(instructions).acc)
console.log("task 2: ", changeCommands(instructions));
