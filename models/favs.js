const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  announcement : {
    type: Schema.Types.ObjectId,
    required : true
  },
  whom : {
    type : Schema.Types.ObjectId,
    required: true
  }
},{
  timestamps : true
})

module.exports = mongoose.model('Fav' , announcementSchema);
