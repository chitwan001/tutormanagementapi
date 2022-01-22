const express = require('express');
const routes = express.Router();
const isauth = require('../middlewares/is-auth');
const announceController = require('../controllers/announcement');
routes.post('/send',isauth,announceController.sendannounce);
routes.post('/getannounces',isauth,announceController.getannounce);

module.exports = routes;
