const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  const authHeader = req.get('Authorization');
  if(!authHeader){
    console.log('not set!');
    res.send({not : "NOT"})
  }
  else{
    const token = authHeader.split(' ')[1];
  let decodedtoken;
  try{
    decodedtoken = jwt.verify(token , 'q0ceyhwmxk');

  }catch(err){
    console.log(err);
  }
  if(!decodedtoken){
    console.log('Not Set');
  }
  req.userId = decodedtoken.userId;
  next();
  }
}
