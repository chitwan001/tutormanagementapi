const express = require('express');
const routes = express.Router();
const isauth = require('../middlewares/is-auth');
const inviController = require('../controllers/invitation');
routes.post('/newinvite',isauth,inviController.createInvi);

module.exports = routes;
