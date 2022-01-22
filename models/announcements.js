const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  content : {
    type: String,
    required : false
  },
  attachements : {
    type: Array,
    required : true
  },
  bywhom : {
    type : Schema.Types.ObjectId,
    required: true
  },
  whichclass : {
    type : Schema.Types.ObjectId,
    required : true
  }
},{
  timestamps : true
})

module.exports = mongoose.model('Announcement' , announcementSchema);
