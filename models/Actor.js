const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Actor = new Schema({
  actorName: String,
  actorDescription: String,
  userStoreis: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserStory'}]
});



module.exports = mongoose.model("Actor", Actor);