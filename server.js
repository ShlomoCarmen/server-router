const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')

const actor = require('./router/actor');
const general = require('./router/general');
const project = require('./router/project');
const app = express();

const Project = require('./models/Project');
const Version = require('./models/Version');
const Actor = require('./models/Actor');
const mongoURI = 'mongodb://127.0.0.1/scoper-router';

mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));


app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));


app.use('/api/actor', actor);
app.use('/api/project', project);
app.use('/api/general', general);



app.put('/projectDescription/:projctId', function (req, res) {
    newProject.findById(req.params.projctId, (err, newProject) => {

        newProject.allVersions[newProject.allVersions.length - 1].projectDescription = req.body.projectDescription;

        newProject.save();
        res.send('new version creaeted');
    })
});

app.put('/rejection/:projctId', function (req, res) {
    newProject.findById(req.params.projctId, (err, newProject) => {

        newProject.allVersions[newProject.allVersions.length - 1].rejectionExplenation = req.body.rejectionExplenation;

        newProject.save();
        res.send('rejectionExplenation saved');
    })
});



app.put('/userStoreis/:projctId/:location', function (req, res) {
    newProject.findById(req.params.projctId, (err, newProject) => {

        newProject.allVersions[newProject.allVersions.length - 1].allActors[req.params.location].userStoreis.push(req.body.userStory);

        newProject.save();
        res.send('user story added');
    })
});

app.put('/editActor/:projctId/:location', function (req, res) {
    newProject.findById(req.params.projctId, (err, newProject) => {

        // newProject.allVersions[newProject.allVersions.length - 1].allActors[req.params.location].allActors.push(req.body);
        var edit = newProject.allVersions[newProject.allVersions.length - 1].allActors[req.params.location];
        edit.actorName = req.body.actorName;
        edit.actorDescription = req.body.actorDescription;

        newProject.save();
        res.send('user story added');
    })
});



app.delete('/userStoreis/:projctId/:actorLocation/:storyLocation', function (req, res) {
    newProject.findById(req.params.projctId, (err, newProject) => {

        newProject.allVersions[newProject.allVersions.length - 1].allActors[req.params.actorLocation].userStoreis.splice(req.params.storyLocation, 1);

        newProject.save();
        res.send('actor deleted');
    })
});


app.listen(5500);