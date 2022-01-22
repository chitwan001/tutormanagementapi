const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classesSchema = new Schema({
  name: {
    type: String,
    required : true
  },
  batchname : {
    type: String,
    required : true
  },
  subject : {
    type: String,
    required : true
  },
  students : {
    type: [Schema.Types.ObjectId , String],
    required : false
  },
  teachers : {
    type : [Schema.Types.ObjectId, String],
    required : true
  },
  master : {
    type: String,
    required: true
  },
  classcodefs: {
    type: String,
    required: true
  },
  classcodeft: {
    type: String,
    required: true
  },
  announcements : {
    type : [Schema.Types.ObjectId],
    ref: 'Announcement',
    required: false
  },
  img: {
    type: String,
    required: true
  },
  availableslots : {
    type : Number,
    required : true
  },
  maxstudents : {
    type : Number,
    required: true
  }
},{
  timestamps : true
})

module.exports = mongoose.model('Class' , classesSchema);
