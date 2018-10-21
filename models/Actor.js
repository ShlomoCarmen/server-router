const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Actor = new Schema({
  actorName: String,
  actorDescription: String,
  userStoreis: [String]
});



module.exports = mongoose.model("Actor", Actor);