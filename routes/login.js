const express = require('express');
const routes = express.Router();
const isauth = require('../middlewares/is-auth');
const loginController = require('../controllers/login');


routes.get('/gettutorname',isauth,loginController.gettutorname);
routes.get('/getstuname',isauth,loginController.getstuname);
routes.post('/changeunamestu',isauth,loginController.changeunamestu);
routes.post('/changeunameteach',isauth,loginController.changeunameteach);
routes.post('',loginController.loginRequest);
module.exports = routes;
