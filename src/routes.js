const { Router } = require('express');

const routes = new Router();

const boletoController = require('./app/controllers/boletoController');

routes.post('/boleto', boletoController.validateBoleto);

module.exports = routes;
