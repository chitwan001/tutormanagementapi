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
  tutor.find({email : req.body.email}).then(data => {
    if(data.length != 0){
      console.log(data);
      loadeduser = data[0];
      var compare = bcrypt.compare(req.body.pass , loadeduser.password);
      console.log(compare);
      return compare;
    }
    else{
      return false;
    }
  }).then(compare => {
    console.log(compare);
    if(compare){
      console.log(loadeduser._id);
      const token = jwt.sign({
        email : loadeduser.email,
        userId : loadeduser._id
      },'q0ceyhwmxk',{
        expiresIn: '1h'
      });
      return token;
    }
    else{
      return null;
    }
  }).then(comp => {
    if(comp){
      return res.send({token : comp , userId: loadeduser._id,type : loadeduser.type});
    }
  }).catch(err => {
    console.log(err);
  })
  student.find({email : req.body.email}).then(data => {
    if(data.length != 0){
      console.log(data);
      loadeduser = data[0];
      var compare1 = bcrypt.compare(req.body.pass, loadeduser.password);
      return compare1;
    }
    else{
      return false;
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
      return null;
    }
  }).then(comp => {
    if(comp){
      return res.send({token : comp , userId: loadeduser._id,type : loadeduser.type});
    }
  }).catch(err => {
    console.log(err);
  })
}
exports.changeunamestu = (req,res,next) => {
  student.findById(req.userId).then(data => {
    var pass = data.password;
    var compare = bcrypt.compare(req.body.pass , pass);
    return compare;
  }).then(comp => {
    if(comp == true){
      student.updateOne({_id : req.userId},{
        name : req.body.newname
      }).then(data => {
        res.send({response : 'ok'});
      })
    }
  })
}
exports.changeunameteach = (req,res,next) => {
  tutor.findById(req.userId).then(data => {
    var pass = data.password;
    var compare = bcrypt.compare(req.body.pass , pass);
    return compare;
  }).then(comp => {
    if(comp == true){
      tutor.updateOne({_id : req.userId},{
        name : req.body.newname
      }).then(data => {
        res.send({response : 'ok'});
      })
    }
  })
}