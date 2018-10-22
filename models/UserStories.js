const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserStory = new Schema({
    subject: String,
    title: String,
    userStory: String
});


module.exports = mongoose.model("UserStory", UserStory);