const express = require('express');
const routes = express.Router();
const isauth = require('../middlewares/is-auth');
const classesController = require('../controllers/classes');
routes.post('/create',isauth,classesController.createClass);
routes.get('/gcft',isauth,classesController.getClassesTeachers);

module.exports = routes;
