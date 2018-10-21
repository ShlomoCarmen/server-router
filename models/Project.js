const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Project = new Schema({
    projectName: String,
    allVersions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Version'}]
});


module.exports = mongoose.model("newProject", Project);