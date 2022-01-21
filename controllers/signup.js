const tutorModel = require('../models/tutor');
const studentModel =require('../models/student');
const bcrypt = require('bcrypt');
exports.signupstudent = (req,res,next) => {
  bcrypt.hash(req.body.pass,12).then(hashedpass => {
    const newstudent = new studentModel({
      name : req.body.name,
      class : req.body.class,
      email : req.body.email,
      password : hashedpass,
      dob : req.body.dob,
      activeat : new Date()
    });
    newstudent.save().then(result => {
      console.log(result);
      res.send({
        response : 'ok'
      })
    })
  })
}
exports.signuptutor = (req,res,next) => {
  console.log(req.body);
  const newtutor = new tutorModel({
    name : req.body.name,
    degree : req.body.degree,
    subjectstoteach : req.body.stt,
    isactive : true
  });
  newtutor.save().then(result => {
    console.log(result);
    res.send({
      response : 'ok'
    })
  })
}
