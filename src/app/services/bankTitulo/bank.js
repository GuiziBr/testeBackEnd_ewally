const checkBankCode = require('../publicFunctions/checkBankCode');
const codigoBarras = require('../bankTitulo/codigoBarras');
const validation = require('./validation');

exports.checkBoleto = async boletoCode => {
  const response = {};
  if (!(await checkBankCode.getBank(boletoCode))) return false;
  if (boletoCode[3] !== '9') return false;

  if (!(await validation.tituloDV(boletoCode))) return false;

  response.dataVencimento = await validation.expireDate(boletoCode);

  response.valor = await validation.value(boletoCode);

  response.codigoBarras = await codigoBarras.createCodigoBarras(boletoCode);

  response.linhaValida = true;

  codigoBarras.createCodigoBarras(boletoCode);

  return response;
};
