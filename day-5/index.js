const fs = require("fs");

const input = fs.readFileSync("day-5/input.txt", "utf-8");

const range = (num) => new Array(num).fill(true).map((_, idx) => idx);

const splitter = (pos) => {
  return {
    F: (rows) => rows.slice(0, (Math.floor(rows.length / 2))),
    B: (rows) => rows.slice((Math.floor(rows.length / 2)), rows.length),
    R: (cols) => cols.slice((Math.floor(cols.length / 2)), cols.length),
    L: (cols) => cols.slice(0, (Math.floor(cols.length / 2))),
  }[pos];
};


const getPosition = (chars, range) => {
  if (range.length === 1) {
    return range[0];
  }
  const [first, ...rest] = chars;
  const newRange = splitter(first)(range);
  return getPosition(rest, newRange);
};

const getSeatId = (rowsRange, colsRange, seat) => {
  const rowChars = seat.replace(/[R, L]/g, '').split('');
  const colChars = seat.replace(/[F, B]/g, '').split('');
  const rowNumber = getPosition(rowChars, rowsRange);
  const colNumber = getPosition(colChars, colsRange);
  return rowNumber * 8 + colNumber;
};

const getSeatsIds = () => {
  const rows = input.trim().split(/\n/);
  const rowsRange = range(128);
  const colsRange = range(8);
  return rows.map((row) => getSeatId(rowsRange, colsRange, row));
};

const firstTask = () => Math.max(...getSeatsIds());

const secondTask = () => {
  const seatsIds = getSeatsIds().sort((a, b) => a -b);
  const [before] = seatsIds.filter((id, idx) => id + 1 !== seatsIds[idx + 1]);
  return before + 1;
};

console.log(firstTask());
console.log(secondTask());
