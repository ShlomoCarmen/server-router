const express = require('express');

const router = express.Router();
const Project = require('../models/Project');
const Actor = require('../models/Actor');
const Version = require('../models/Version');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post("/newProject", function (req, res) {
    let firstProject = new Project({
        projectName: req.body.projectName,
        allVersions: []
    });


    firstProject.save(function (err, newProject) {
        if (!err) {
            const version = new Version({
                rejectionExplenation: "",
                editorName: req.body.editorName,
                assumptions: [],
                projectDescription: '',
                versionNumber: 1,
                allActors: []

            });


            version.save((err, newVersion) => {
                if (!err) {
                    console.log("newVersion", newVersion)
                    newProject.allVersions.push(newVersion);
                    newProject.save((err, project) => {
                        res.send(project);

                    })
                } else {
                    res.send(err);
                }
            });
            
            const actor = new Actor({
                actorName: "",
                actorDescription: "",
                userStoreis: []
            });

            actor.save((err, actor) => {
                if (!err) {
                    version.allActors.push(actor);
                    version.save((err, version) => {
                          res.send(version);
                    })
                }
            })


        } else {
            res.send(err);
        }
    })
});

router.get('/allData/:projctId', function (req, res) {
    Project.findOne({_id: req.params.projctId})
    .populate("allVersions").exec((err, project) => {
        if (!err) {
            console.log(project.allVersions[project.allVersions.length -1]);
            Version.findOne({_id: project.allVersions[project.allVersions.length -1]})
            .populate("allActors").exec((err, project)=>{
                if (!err) {
                    console.log("aaaaaaaaaaaa", project);
                    
                    res.send(project);
                }else{
                    res.send(err);
                }
            })
            
        } else {
            res.send(err);
        }
    })
});

router.put('/newVersion/:projctId', function (req, res) {
    Project.findOne({_id: req.params.projctId})
    .populate("allVersions").exec((err, project) => {
        const correntVersion = project.allVersions[project.allVersions.length - 1];
        const version = new Version({
            rejectionExplenation: "",
            editorName: req.body.editorName,
            projectDescription: correntVersion.projectDescription,
            versionNumber: correntVersion.versionNumber + 1,
            allActors: correntVersion.allActors,
            assumptions: correntVersion.assumptions,

        })

        version.save((err, newVersion) => {
            if (!err) {
                project.allVersions.push(newVersion);
                project.save((err, project) => {
                    res.send('new version creaeted');

                })
            } else {
                res.send(err);
            }
        });
    })
});


router.get('/allProjects', function (req, res) {
    Project.find({}, "projectName", (err, newProject) => {

        if (!err) {
            res.send(newProject);

        } else {
            res.send(err);
        }
    })
});


module.exports = router;