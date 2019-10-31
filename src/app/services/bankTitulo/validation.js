const moment = require('moment');
const getDigit = require('../publicFunctions/getDigit');

exports.expireDate = async boletoCode => {
  const expireFactor = Number(boletoCode.substring(33, 37));
  const futureDate = moment('2025-02-22').format();
  const baseDate = moment('1997-10-07').format();
  if (moment().format() <= futureDate) {
    return moment(baseDate)
      .locale('pt-br')
      .add(expireFactor, 'days')
      .calendar();
  }
  return moment(futureDate)
    .locale('pt-br')
    .add(expireFactor % 1000, 'days')
    .calendar();
};

exports.tituloDV = async boletoCode => {
  const field1 = boletoCode
    .substring(0, 9)
    .split('')
    .reverse();
  const field2 = boletoCode
    .substring(10, 20)
    .split('')
    .reverse();
  const field3 = boletoCode
    .substring(21, 31)
    .split('')
    .reverse();

  const validFiedl1 =
    (await getDigit.tituloDV(field1)) === Number(boletoCode[9]);
  const validField2 =
    (await getDigit.tituloDV(field2)) === Number(boletoCode[20]);
  const validField3 =
    (await getDigit.tituloDV(field3)) === Number(boletoCode[31]);

  return !!(validFiedl1 && validField2 && validField3);
};

exports.value = async boletoCode => {
  return (Number(boletoCode.substring(37, 48)) / 100).toFixed(2);
};
