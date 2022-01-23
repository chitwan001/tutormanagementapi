const tutor = require('../models/tutor');
const student = require('../models/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.gettutorname = (req,res,next) => {
  tutor.findById(req.userId).then(data => {
    var tutorname = data.name;
    res.send({name : tutorname.split(' ')[0]});
  })
}
exports.getstuname = (req,res,next) => {
  student.findById(req.userId).then(data => {
    var tutorname = data.name;
    res.send({name : tutorname.split(' ')[0]});
  })
}
exports.loginRequest = (req,res,next) => {
  console.log(req.body);
  var loadeduser = null;
  var check = false;
  tutor.find({email : req.body.email}).then(data => {
    if(data.length != 0){
      console.log(data);
      loadeduser = data[0];
      var compare = bcrypt.compare(req.body.pass , loadeduser.password);
      console.log(compare);
      return compare;
    }
    else{
      check = false;
      return 'NA';
    }
  }).then(compare => {
    // console.log(compare);
    if(compare == true){
      // console.log(loadeduser._id);
      const token = jwt.sign({
        email : loadeduser.email,
        userId : loadeduser._id
      },'q0ceyhwmxk');
      return token;
    }
    else if(compare == 'NA'){
      return 'NA';
    }
  }).then(comp => {
    if(comp !='NA'){
      return res.send({token : comp , userId: loadeduser._id,type : loadeduser.type});
    }
    else if(comp=='NA'){
      
    }
    else{
      res.send({messge : 'Password not matched'});
    }
  }).catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
  }
  next(err);
  })
  student.find({email : req.body.email}).then(data => {
    if(data.length != 0){
      console.log(data);
      loadeduser = data[0];
      var compare1 = bcrypt.compare(req.body.pass, loadeduser.password);
      return compare1;
    }
    else{
      return res.send({messge : 'Email not available for login. Sign up!'});
    }
  }).then(compare1 => {
    if(compare1){
      const token = jwt.sign({
        email : loadeduser.email,
        userId : loadeduser._id
      },'q0ceyhwmxk',{
        expiresIn: '1h'
      });
      return token;
    }
    else{
      return res.send({messge : 'Password not matched!'});
    }
  }).then(comp => {
    if(comp){
      return res.send({token : comp , userId: loadeduser._id,type : loadeduser.type});
    }
  }).catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
  }
  next(err);
  })
}
exports.changeunamestu = (req,res,next) => {
  student.findById(req.userId).then(data => {
    var pass = data.password;
    var compare = bcrypt.compare(req.body.pass , pass);
    if(compare == true){
      return compare;
    }else{
      res.send({messge : 'Password not matched!'});
    }
  }).then(comp => {
    if(comp == true){
      student.updateOne({_id : req.userId},{
        name : req.body.newname
      }).then(data => {
        res.send({response : 'ok'});
      })
    }
  }).catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
  }
  next(err);
  })
}
exports.changeunameteach = (req,res,next) => {
  tutor.findById(req.userId).then(data => {
    var pass = data.password;
    var compare = bcrypt.compare(req.body.pass , pass);
    if(compare == true){
      return compare;
    }else{
      res.send({messge : 'Password not matched'});
    }
  }).then(comp => {
    if(comp == true){
      tutor.updateOne({_id : req.userId},{
        name : req.body.newname
      }).then(data => {
        res.send({response : 'ok'});
      }).catch(err => {
        if(!err.statusCode){
          err.statusCode = 500;
      }
      next(err);
      })
    }
  })
}