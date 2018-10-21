const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Version = new Schema({
  rejectionExplenation: String,
  editorName: String,
  projectDescription: String,
  versionNumber: Number,
  assumptions: [String],
  date: { type: Date, default: Date.now },
  allActors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Actor'}]
});


module.exports = mongoose.model("Version", Version);