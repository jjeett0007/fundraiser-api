const generateRandomNumber = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};

module.exports = generateRandomNumber;
