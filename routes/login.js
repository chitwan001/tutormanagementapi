const express = require('express');
const routes = express.Router();

const loginController = require('../controllers/login');
routes.post('',loginController.loginRequest);

module.exports = routes;
