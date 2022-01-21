const express = require('express');
const routes = express.Router();
const isauth = require('../middlewares/is-auth');
const signupController = require('../controllers/signup');
routes.post('/tutor',signupController.signuptutor);
routes.post('/student',signupController.signupstudent);

module.exports = routes;
