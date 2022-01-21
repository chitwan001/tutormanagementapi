const classes = require('../models/classes');
const tutors = require('../models/tutor');
exports.createClass = (req,res,next) => {
  console.log(req.body);
  var classid;
  var classesarr = [];
  tutors.findById(req.userId).then(teacher => {
    var tname = teacher.name;
    classesarr = teacher.tutorofclass;
    console.log(tname);
    return tname;
  }).then(tname => {
    const newclass = new classes({
      name : req.body.bname,
      batchname : req.body.wbatch,
      subject : req.body.subject,
      teachers : [req.userId],
      classcodefs : 'ASD123',
      classcodeft : 'QWR432',
      maxstudents: req.body.max,
      master : tname
    })
    newclass.save().then(data => {
      console.log(data);
      classid = data._id;
      classesarr.push(classid);
      tutors.updateOne({_id : req.userId},{
        tutorofclass : classesarr
      }).then(abcd => {
        res.send({response : 'ok'})
      })
    })
  })
}
exports.getClassesTeachers = (req,res,next) => {

  classes.find({teachers : req.userId}).then(classes => {
    res.send(classes);
  })
  // res.send({hello : 'here'});
}
exports.deleteClass = (req,res,next) => {
  classes.remove({_id : req.body.cid }).then(data => {
    res.send({
      response : 'ok'
    })
  })
}
