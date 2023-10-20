const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  comment: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
   },

   id: {
     type: String,
    }

})


module.exports = mongoose.model('Comment', commentSchema)