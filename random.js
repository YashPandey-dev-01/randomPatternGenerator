const getRandomNumber = function (lowerBound, upperBound) {
  const randomNumberInRange = lowerBound + Math.random() * (upperBound - lowerBound);

  return Math.round(randomNumberInRange);
}

const getRandomAxis = function () {
  return getRandomNumber(0, 1) === 0 ? 'x' : 'y';
}

const getRandomColor = function () {
  return {
    r: getRandomNumber(0, 255),
    g: getRandomNumber(0, 255),
    b: getRandomNumber(0, 255),
    a: 255,
  }
}

module.exports = {
  getRandomNumber,
  getRandomAxis,
  getRandomColor
}