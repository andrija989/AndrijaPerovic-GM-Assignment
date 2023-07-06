module.exports = {
  randomStringGenerator(number = 5) {
    let randomString = "";
    for (let i = 0; i < number; i++) {
      const random = Math.floor(Math.random() * 26);
      randomString += String.fromCharCode(97 + random);
    }
    return randomString;
  },
  randomNumberGenerator(digits) {
    let number = Math.floor(Math.random() * 10 ** digits);
    return number;
  },
  currentDate() {
    return new Date().toJSON().slice(0, 10);
  },
  randomPassword(number = 5) {
    let randomString;
    for (let i = 0; i < number; i++) {
      const random = Math.floor(Math.random() * 26);
      randomString += String.fromCharCode(97 + random);
    }
    randomString += "@!AB1";
    return randomString;
  },
};
