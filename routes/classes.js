const express = require('express');
const routes = express.Router();
const isauth = require('../middlewares/is-auth');
const {body} = require('express-validator/check');
const classesController = require('../controllers/classes');
routes.post('/create',isauth,classesController.createClass);
routes.post('/delete',isauth,classesController.deleteClass);
routes.post('/getclassid',isauth,classesController.getClassId);
routes.post('/getclasscourse',isauth,classesController.getClassCourse);
routes.post('/unenroll',isauth,classesController.unenroll);
routes.post('/getmixname',isauth,classesController.getmixname);
routes.post('/getstuname',isauth,classesController.getStuname);
routes.post('/getstuleft',isauth,classesController.getstuleft);
routes.get('/gcft',isauth,classesController.getClassesTeachers);
routes.get('/gcfs',isauth,classesController.getClassesStu);

module.exports = routes;
