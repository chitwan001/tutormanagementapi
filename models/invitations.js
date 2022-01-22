const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationsSchema = new Schema({
  bystudent : {
    type: [Schema.Types.ObjectId],
    ref: 'Student',
    required : true
  },
  batchname : {
    type: String,
    required: true
  },
  subject : {
    type: String,
    required: true
  },
  stuname : {
    type: String,
    required: true
  },
  teacher : {
    type: String,
    required: true
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
},{
  timestamps : true
})

module.exports = mongoose.model('Invitation' , invitationsSchema);
