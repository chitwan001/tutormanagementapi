const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');

const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const classesRoutes = require('./routes/classes');
const inviRoutes = require('./routes/invitations');
const announceRoutes = require('./routes/announcement');
const favsRoutes = require('./routes/announcement');
const isauth = require('./middlewares/is-auth');
const path  = require('path');

const fileStorage = multer.diskStorage({
  destination : (req,file,cb) => {
    cb(null,'images');
  },
  filename: (req,file,cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
})
const filefilter = (req,file,cb) => {
  if(file.mimetype === "application/msword" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"|| file.mimetype === "application/pdf"
  || file.mimetype === "application/vnd.ms-powerpoint"
  || file.mimetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation"|| file.mimetype === "text/plain"|| file.mimetype === "application/vnd.ms-excel"
  || file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ){
    cb(null,true);
  }else{
    cb(null,false);
  }
}
app.use(bodyParser.json());
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(multer({storage : fileStorage, fileFilter : filefilter}).single('file'));
app.use((req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
})


app.use('/signup',signupRoutes);
app.use('/classes',classesRoutes);
app.use('/login',loginRoutes);
app.use('/invites',inviRoutes);
app.use('/announcement',announceRoutes);
app.use('/favs',favsRoutes);
app.use('/',(req,res,next) =>{
  console.log("connected!");
  res.send({hello : 'Kya hai'});
})


mongoose.connect('mongodb+srv://chitwan001:id5TIq1CGdGLegXO@cluster0.yowm9.mongodb.net/TutorManagement?retryWrites=true&w=majority').then(result =>{
    console.log('Connected!');
    app.listen(process.env.PORT || 3000);
}).catch(err => {
    console.log(err);
})
