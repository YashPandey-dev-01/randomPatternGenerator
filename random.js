const getRandomNumber = function (lowerBound, upperBound) {
  const randomNumber = Math.random() * (upperBound - lowerBound);
  const randomNumberInRange = lowerBound + randomNumber;

  return Math.round(randomNumberInRange);
}

const getRandomAxis = function () {
  const randomNumber = getRandomNumber(0, 1);

  return randomNumber === 0 ? 'x' : 'y';
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