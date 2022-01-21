const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationsSchema = new Schema({
  title: {
    type: String,
    required : true
  },
  bystudent : {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required : true
  },
  totutor : {
    type: [Schema.Types.ObjectId],
    ref: 'Tutor',
    required : true
  },
  forbatch : {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required : true
  },
  isaccepted : {
    type : Boolean,
    required : true
  }
})

module.exports = mongoose.model('Invitation' , invitationsSchema);
