const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = new Schema({
  name: String,
  description :String
})

const Version = new Schema({
  rejectionExplenation: String,
  editorName: String,
  projectDescription: String,
  projectName: String,
  versionNumber: Number,
  subjects: [Subject],
  assumptions: [String],
  date: { type: Date, default: Date.now },
  allActors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Actor'}]
});


module.exports = mongoose.model("Version", Version);