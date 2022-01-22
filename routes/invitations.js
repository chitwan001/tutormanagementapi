const express = require('express');
const routes = express.Router();
const isauth = require('../middlewares/is-auth');
const inviController = require('../controllers/invitation');
routes.post('/newinvite',isauth,inviController.createInvi);
routes.post('/acceptinvite',isauth,inviController.acceptinvi);
routes.post('/decline',isauth,inviController.delete);
routes.get('/getinvitestu',isauth,inviController.getInviStu);
routes.get('/getinvitetut',isauth,inviController.getInviTut);

module.exports = routes;
