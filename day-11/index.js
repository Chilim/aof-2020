const fs = require('fs');
const input = fs.readFileSync('day-11/input.txt', 'utf-8');
const seats = input.split(/\n/).map(row => row.split('')).filter(Boolean);

const adjacentSeatsAreOccupied = (adjacentSeats, occupNum) => adjacentSeats.filter(s => s === '#').length > occupNum;
const noOccupiedSeats = (adjacentSeats) => adjacentSeats.every(seat => seat === 'L' || seat === '.');

const getAdjacentSeats = (seats, rowIdx, seatIdx) => {
  const sameRow = seats[rowIdx];
  const prevRow = seats[rowIdx - 1];
  const nextRow = seats[rowIdx + 1];

  const sameRowSeats = [sameRow[seatIdx - 1],sameRow[seatIdx + 1]];
  const prevRowSeats = [prevRow && prevRow[seatIdx - 1], prevRow && prevRow[seatIdx], prevRow && prevRow[seatIdx + 1]];
  const nextRowSeats = [nextRow && nextRow[seatIdx - 1], nextRow && nextRow[seatIdx], nextRow && nextRow[seatIdx + 1]];
  return [...sameRowSeats, ...prevRowSeats, ...nextRowSeats].filter(Boolean);
}

const getFirstAdjacentSeats = (seats, rowIdx, seatIdx) => {
  const getAdjacentSeatByDir = (dirCoord, curPos) => {
    const { y, x } = dirCoord;
    const { rowIdx, seatIdx } = curPos;
    let posX = seatIdx + x;
    let posY = rowIdx + y;
    let adjacentSeat = undefined;

    while (posX >= 0 && posY >= 0 && posX < seats[0].length && posY < seats.length) {
      if (seats[posY][posX] !== '.' ) {
        adjacentSeat = seats[posY][posX];
        break;
      }
      posX += x;
      posY += y;
    }
    return adjacentSeat;
  }
  const directions = [
    { y: 1, x: 0 }, { y: -1, x: 0 }, { y: 0, x: -1 },{ y: 0, x: 1 },
    { y: -1, x: -1 },{ y: -1, x: 1 },{ y: 1, x: -1 }, { y: 1, x: 1 }
    ];
  const position = { rowIdx, seatIdx };
  const adjacentSeats = directions.map(dir => getAdjacentSeatByDir(dir, position));
  return adjacentSeats.flat().filter(Boolean);
};

const occupy = (layout, getAdjSeatsFn, occupNum) => {
  let layoutChanged = false;
  const newLayout = layout.map((row, rowIdx) => {
    return row.map((seat, seatIdx) => {
      const adjacentSeats = getAdjSeatsFn(layout, rowIdx, seatIdx);
      if (seat === 'L' && noOccupiedSeats(adjacentSeats)) {
        layoutChanged = true;
        return '#';
      }
      if (seat === '#' && adjacentSeatsAreOccupied(adjacentSeats, occupNum)) {
        layoutChanged = true;
        return 'L'
      }
      return seat;
    })
  })
  return {  newLayout, hasChanged: layoutChanged};
}

const countOccupiedSeats = (seats, getAdjSeatsFn, occupNum) => {
  let shouldOccupy = true;
  let layout = seats;

  while (shouldOccupy) {
    const { newLayout, hasChanged } = occupy(layout, getAdjSeatsFn, occupNum);
    layout = newLayout;
    shouldOccupy = hasChanged;
  }
  return layout.flat().filter(s => s === '#').length;
}

console.log('first task: ', countOccupiedSeats(seats, getAdjacentSeats, 3));
console.log('second task: ', countOccupiedSeats(seats, getFirstAdjacentSeats, 4));
