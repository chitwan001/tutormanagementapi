const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  title: {
    type: String,
    required : true
  },
  content : {
    type: String,
    required : true
  },
  attachements : {
    type: Array,
    required : true
  }
},{
  timestamps : true
})

module.exports = mongoose.model('Announcement' , announcementSchema);
