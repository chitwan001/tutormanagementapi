const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  const authHeader = req.get('Authorization');
  if(!authHeader){
    const err = new Error('Not logged in!');
                    err.statusCode = 401;
                    throw err;
  }
  else{
    const token = authHeader.split(' ')[1];
  let decodedtoken;
  try{
    decodedtoken = jwt.verify(token , 'q0ceyhwmxk');
  }catch(err){
    if(!err.statusCode){
      err.statusCode = 404;
      err.message = "You are logged out! Please login again!";
  }
  next(err);
  }
  if(!decodedtoken){
    const err = new Error('You are logged out! Please login again!');
                    err.statusCode = 404;
                    throw err;
  }
  req.userId = decodedtoken.userId;
  next();
  }
}
