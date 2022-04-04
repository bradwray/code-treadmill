const colorValues = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "A",
  "B",
  "C",
  "D",
  "E",
  "F"
];

function createRandomHex(size) {
  const hex = "#" + chooseRandomColor(size);
  return hex;
}

//choose random color function
function chooseRandomColor(size) {
  let hexValues = [];
  for (let i = 0; i < size; i++) {
    const index = Math.floor(Math.random() * colorValues.length);
    hexValues.push(colorValues[index]);
  }
  return hexValues.join("");
}

export default createRandomHex;
