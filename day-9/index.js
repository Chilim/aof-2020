const fs = require('fs');
const input = fs.readFileSync('day-9/input.txt', 'utf-8');
const numbers = input.split(/\n/).map(n => +n);

const isValidNext = (preamble, next) => {
  let isValid = false;
  for (let i = 0; i < preamble.length; i += 1) {
    for (let j = i + 1; j < preamble.length; j += 1) {
      if (preamble[i] + preamble[j] === next) {
        isValid = true;
        break;
      }
    }
  }
  return isValid;
};

const getSumSequence = (numbers, invalidNum) => {
  let idxStart = 0;
  let pointer = 1;
  let sum = numbers[idxStart];
  while (idxStart <= numbers.length) {
    sum += numbers[pointer];
    if (sum === invalidNum) {
      break;
    }
    if (sum > invalidNum) {
      idxStart += 1;
      sum = numbers[idxStart];
      pointer = idxStart + 1;
      continue;
    }
    pointer += 1;
  }
  return numbers.slice(idxStart, pointer);
};

const getInValidNumber = (numbers, preambleLength) => {
  let idxStart = 0;
  let idxEnd = preambleLength;
  let length = numbers.length;
  let invalidNumber = undefined;
  while (length >= 0) {
    const preamble = numbers.slice(idxStart, idxEnd);
    const isValid = isValidNext(preamble, numbers[idxEnd]);
    if (!isValid) {
      invalidNumber = numbers[idxEnd];
      break;
    }
    length -= 1;
    idxStart += 1;
    idxEnd += 1;
  }
  return invalidNumber;
};

const getWeakness = (numbers, preambleLength) => {
  const inValidNum = getInValidNumber(numbers, preambleLength);
  const sumSequence = getSumSequence(numbers, inValidNum);
  return Math.max(...sumSequence) + Math.min(...sumSequence);
};

console.log('first task: ', getInValidNumber(numbers, 25));
console.log('second task ', getWeakness(numbers, 25));


