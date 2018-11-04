const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')

const actor = require('./router/actor');
const general = require('./router/general');
const project = require('./router/project');
const userStory = require('./router/userStory');

const app = express();

const Project = require('./models/Project');
const mongoURI = 'mongodb://127.0.0.1/Project-Scoper-DB';

mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));


app.use(bodyParser.json());


app.use('/api/actor', actor);
app.use('/api/project', project);
app.use('/api/general', general);
app.use('/api/userStory', userStory);


app.listen(5000);