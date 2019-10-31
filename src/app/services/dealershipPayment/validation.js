const moment = require('moment');
const getDigit = require('../publicFunctions/getDigit');

exports.checkProduct = async boletoCode => {
  return boletoCode[0] === '8';
};

exports.checkSegment = async boletoCode => {
  return boletoCode[1] !== '0';
};

exports.checkBoxes = async boletoCode => {
  const box1 = boletoCode.substring(0, 11).split('');
  const box1DV = Number(boletoCode.substring(12, 13));
  const box2 = boletoCode.substring(12, 23).split('');
  const box2DV = Number(boletoCode.substring(24, 25));
  const box3 = boletoCode.substring(24, 35).split('');
  const box3DV = Number(boletoCode.substring(36, 37));
  const box4 = boletoCode.substring(36, 47).split('');
  const box4DV = Number(boletoCode.substring(48, 49));

  if (boletoCode[2] === '6' || boletoCode[2] === '7') {
    if ((await getDigit.dealershipDVMod10(box1)) !== box1DV) return false;
    if ((await getDigit.dealershipDVMod10(box2)) !== box2DV) return false;
    if ((await getDigit.dealershipDVMod10(box3)) !== box3DV) return false;
    if ((await getDigit.dealershipDVMod10(box4)) !== box4DV) return false;
  } else {
    if ((await getDigit.dealershipDVMod11(box1)) !== box1DV) return false;
    if ((await getDigit.dealershipDVMod11(box2)) !== box2DV) return false;
    if ((await getDigit.dealershipDVMod11(box3)) !== box3DV) return false;
    if ((await getDigit.dealershipDVMod11(box4)) !== box4DV) return false;
  }
  return true;
};

exports.createBarCode = async boletoCode => {
  const field1 = boletoCode.substring(0, 11).split('');
  const field2 = boletoCode.substring(12, 23).split('');
  const field3 = boletoCode.substring(24, 35).split('');
  const field4 = boletoCode.substring(36, 47).split('');
  const currentDV = Number(field1.splice(3, 1));
  const code = field1.concat(field2, field3, field4).reverse();
  let realDv = null;
  if (boletoCode[2] === '6' || boletoCode[2] === '7') {
    realDv = await getDigit.dealershipDVMod10(code);
  } else {
    realDv = await getDigit.dealershipDVMod11(code);
  }
  if (realDv !== currentDV) return false;

  field1.splice(3, 0, realDv.toString());
  return field1.concat(field2, field3, field4).join('');
};

exports.amount = async barCode => {
  if (barCode[2] === '6' || barCode[2] === '8') {
    const amount = barCode.substring(4, 15);
    return (Number(amount) / 100).toFixed(2);
  }
  return null;
};

exports.expireDate = async barCode => {
  const date = barCode.substring(19, 27);
  return moment(date, 'YYYYMMDD').isValid()
    ? moment(date)
        .locale('pt-br')
        .format('L')
    : null;
};
