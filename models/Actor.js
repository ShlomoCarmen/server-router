const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStory = new Schema({
  subject: String,
  title: String,
  userStory: String
});

const Actor = new Schema({
  name: String,
  description: String,
  userStoreis: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserStory'}],
  userStoreisArr :[UserStory]
  
});



module.exports = mongoose.model("Actor", Actor);