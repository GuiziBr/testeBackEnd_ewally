exports.createCodigoBarras = async boletoCode => {
  const codBank = boletoCode.substring(0, 3);
  const currency = boletoCode[3];
  const expireFactor = boletoCode.substring(33, 37);
  const amount = boletoCode.substring(37, 47);
  const position1 = boletoCode.substring(4, 9);
  const position2 = boletoCode.substring(10, 20);
  const position3 = boletoCode.substring(21, 31);

  const code = `${codBank}${currency}${expireFactor}${amount}${position1}${position2}${position3}`
    .split('')
    .reverse();

  let iterator = 2;
  const sum = code
    .map(item => {
      const x = item * iterator;
      iterator = iterator >= 9 ? 2 : (iterator += 1);
      return x;
    })
    .reduce((a, b) => {
      return a + b;
    });
  const subt = 11 - (sum % 11);
  const dv = subt === 0 || subt === 10 || subt === 11 ? 1 : subt;
  const codBarras = `${codBank}${currency}${dv}${expireFactor}${amount}${position1}${position2}${position3}`;
  return codBarras;
};
