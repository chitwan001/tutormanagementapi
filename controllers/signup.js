const tutorModel = require('../models/tutor');
const studentModel =require('../models/student');
const bcrypt = require('bcrypt');
exports.signupstudent = (req,res,next) => {
  bcrypt.hash(req.body.pass,12).then(hashedpass => {
    const newstudent = new studentModel({
      name : req.body.name,
      class : req.body.edu,
      email : req.body.email,
      password : hashedpass,
      dob : req.body.dob,
      type: 'Student',
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
  bcrypt.hash(req.body.pass,12).then(hashedpass => {
    console.log(hashedpass);
    const newtutor = new tutorModel({
      name : req.body.name,
      email : req.body.email,
      password : hashedpass,
      type : 'Tutor',
      degree : req.body.deg,
      isactive : true
    });
    newtutor.save().then(result => {
      console.log(result);
      res.send({
        response : 'ok'
      })
    })
  })
  
}
