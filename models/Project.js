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
    userStoreis: [UserStory]
});

const Subject = new Schema({
    name: String,
    description :String
  })

const Version = new Schema({
    rejectionExplenation: String,
    editorName: String,
    projectDescription: String,
    versionNumber: Number,
    subjects: [Subject],
    generalAssumptions: [String],
    currentAssumptions: [String],
    date: { type: Date, default: Date.now },
    allActors: [Actor]
});

const Project = new Schema({
    projectName: String,
    allVersions: [Version]
});


module.exports = mongoose.model("newProject", Project);