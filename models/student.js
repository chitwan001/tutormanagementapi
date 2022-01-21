const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
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
  },
  dob : {
    type: Date,
    required: true
  },
  class : {
    type: String,
    required : true
  },
  type: {
    type: String,
    required: true
  },
  activeat : {
    type : Date,
    required : true
  },
  enrolledin : {
    type: [Schema.Types.ObjectId],
    ref : 'Class',
    required : false
  }
},{
  timestamps : true
})

module.exports = mongoose.model('Student' , studentSchema);
