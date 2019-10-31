const sanitize = require('../services/sanitizer/sanitizeBoleto');
const bankTitulo = require('../services/bankTitulo/bank');
const dealershipPayment = require('../services/dealershipPayment/dealership');

class BoletoController {
  async validateBoleto(req, res) {
    try {
      const boletoCode = sanitize.lineToNumber(req.body.line);
      if (isNaN(Number(boletoCode))) throw new Error('Caracteres inválidos');
      const type = sanitize.boletoType(boletoCode);
      if (type === null) throw new Error('Tamanho da linha é inválida');

      let response = null;
      switch (type) {
        case 'titulo':
          response = await bankTitulo.checkBoleto(boletoCode);
          if (!response) throw new Error('Lnha digitada é inválida');
          return res.json(response);
        case 'ficha':
          response = await dealershipPayment.checkBoleto(boletoCode);
          if (!response) throw new Error('Lnha digitada é inválida');
          return res.json(response);
        default:
          throw new Error('Linha digitada é inválida');
      }
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new BoletoController();
