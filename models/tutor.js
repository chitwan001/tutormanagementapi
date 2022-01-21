const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
  name: {
    type: String,
    required : true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  ,
  type: {
    type: String,
    required: true
  },
  degree : {
    type: Array,
    required : true
  },
  isactive : {
    type : Boolean,
    required : true
  },
  tutorofclass : {
    type: [Schema.Types.ObjectId],
    ref : 'Class',
    required : false
  }
},{
  timestamps : true
})

module.exports = mongoose.model('Tutor' , tutorSchema);
