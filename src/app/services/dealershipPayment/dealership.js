const validation = require('./validation');

exports.checkBoleto = async boletoCode => {
  const response = {};
  if (!(await validation.checkProduct(boletoCode))) return false;
  if (!(await validation.checkSegment(boletoCode))) return false;
  if (Number(boletoCode[2]) < 6) return false;
  response.codigoBarras = await validation.createBarCode(boletoCode);
  if (!response.codigoBarras) return false;

  await validation.checkBoxes(boletoCode);
  const amount = await validation.amount(response.codigoBarras);
  if (amount !== null)
    response.valor = await validation.amount(response.codigoBarras);

  const expireDate = await validation.expireDate(response.codigoBarras);
  if (expireDate !== null) response.dataVencimento = expireDate;

  response.linhaValida = true;
  return response;
};
