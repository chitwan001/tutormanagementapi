const express = require('express');
const routes = express.Router();
const isauth = require('../middlewares/is-auth');
const signupController = require('../controllers/signup');
routes.post('/tutor',isauth ,signupController.signuptutor);
routes.post('/student',isauth,signupController.signupstudent);

module.exports = routes;
