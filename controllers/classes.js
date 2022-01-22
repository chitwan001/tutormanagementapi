const classes = require('../models/classes');
const tutors = require('../models/tutor');
const student = require('../models/student');
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
      availableslots : req.body.max,
      img : req.body.img,
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
exports.getClassesStu= (req,res,next) => {

  classes.find({students : req.userId}).then(classes => {
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
exports.getClassId = (req,res,next) => {
  classes.findById(req.body.cid).then(data => {
    res.send(data);
  })
}
exports.getClassCourse = (req,res,next) => {
  classes.find({img : req.body.course}).then(data => {
    res.send(data);
  })
}
exports.unenroll = (req,res,next) => {
  classes.findById(req.body.cid).then(data => {
    var stuarr = data.students;
    console.log(stuarr);
    for(var i=0 ;i<stuarr.length ; i++){
      if(stuarr[i] == req.userId){
        // console.log(stuarr[i]);
        break;
      }
    }
    var updatedstuarr = stuarr.splice(i,1);
    console.log(req.userId , stuarr);
    classes.updateOne({_id : req.body.cid},{
      students : stuarr
    }).then(data => {
      res.send({response : 'ok'});
    })
  })
}
exports.getstuleft = (req,res,next) => {
  classes.findById(req.body.cid).then(data => {
    var leftstu = data.availableslots
    res.send({left : leftstu});
  })
}
exports.getStuname = (req,res,next) => {
  student.findById(req.body.stuid).then(data => {
    res.send({name : data.name});
  })
}