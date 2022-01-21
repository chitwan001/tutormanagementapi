const classes = require('../models/classes');
const tutors = require('../models/tutor');
exports.createClass = (req,res,next) => {
  console.log(req.body);
  var classid;
  var classesarr = [];
  tutors.findById('61e942098e49710661d498b8').then(teacher => {
    var tname = teacher.name;
    classesarr = teacher.tutorofclass;
    console.log(tname);
    return tname;
  }).then(tname => {
    const newclass = new classes({
      name : req.body.bname,
      batchname : req.body.wbatch,
      subject : req.body.subject,
      teachers : ['61e942098e49710661d498b8'],
      classcodefs : 'ASD123',
      classcodeft : 'QWR432',
      master : tname
    })
    newclass.save().then(data => {
      console.log(data);
      classid = data._id;
      classesarr.push(classid);
      tutors.updateOne({_id : '61e942098e49710661d498b8'},{
        tutorofclass : classesarr
      }).then(abcd => {
        res.send({response : 'ok'})
      })
    })
  })
}
exports.getClassesTeachers = (req,res,next) => {

  classes.find({teachers : '61e942098e49710661d498b8'}).then(classes => {
    res.send(classes);
  })
  // res.send({hello : 'here'});
}
