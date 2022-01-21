const tutor = require('../models/tutor');
const student = require('../models/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
