const { getRandomNumber } = require("./random.js");

const screen = {
  width: 800,
  height: 500,
  fps: 60,
}

const minDepth = 2;
const maxDepth = 20;

const depth = {
  target: getRandomNumber(minDepth, maxDepth),
  current: 0
}

const gap = 2;

module.exports = {
  screen,
  depth,
  gap,
  minDepth,
  maxDepth
}