const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const classesRoutes = require('./routes/classes');
const isauth = require('./middlewares/is-auth');
app.use(bodyParser.json());

app.use((req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  next();
})


app.use('/signup',signupRoutes);
app.use('/classes',classesRoutes);
app.use('/login',loginRoutes);
app.use('/',(req,res,next) =>{
  console.log("connected!");
  res.send({hello : 'hello'});
})

mongoose.connect('mongodb+srv://chitwan001:id5TIq1CGdGLegXO@cluster0.yowm9.mongodb.net/TutorManagement?retryWrites=true&w=majority').then(result =>{
    console.log('Connected!');
    app.listen(process.env.PORT || 3000);
    res.send({hello : 'mongodb'});
}).catch(err => {
    console.log(err);
})
