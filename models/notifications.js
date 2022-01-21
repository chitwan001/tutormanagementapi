const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  toUser: {
    type: [Schema.Types.ObjectId],
   ref: ['Tutor','Student'],
   required: true
  },
  content : {
    type: String,
    required : true
  }
},{
  timestamps : true
})

module.exports = mongoose.model('Announcement' , notificationsSchema);
