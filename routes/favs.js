const express = require('express');
const routes = express.Router();
const isauth = require('../middlewares/is-auth');
const announceController = require('../controllers/favs');
routes.post('/add',isauth,announceController.addfavs);
routes.get('/get',isauth,announceController.getfav);

module.exports = routes;
