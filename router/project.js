const express = require('express');

const router = express.Router();
const Project = require('../models/Project');
const Actor = require('../models/Actor');
const Version = require('../models/Version');
const UserStory = require('../models/UserStories');

// router.use(function timeLog(req, res, next) {
//     console.log('hallo Shlomo ☺')

//     next()
// })


// === posting new project ====> will creat 3 collections in the DB ===

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
                projectName: req.body.projectName,
                generalAssumptions: [],
                currentAssumptions: [],
                subjects: [],
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
            
        } else {
            res.send(err);
        }
    })
});

//       === getting all data of current version of specific project ===

router.get('/allData/:projctId', function (req, res) {
    Project.findOne({_id: req.params.projctId})
    .populate("allVersions").exec((err, project) => {
        if (!err) {
            // console.log(project.allVersions[project.allVersions.length -1]);
            Version.findOne({_id: project.allVersions[project.allVersions.length -1]})
            .populate("allActors").exec((err, project)=>{
                if (!err) {
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

// === creating new version ===

router.put('/newVersion/:projctId', function (req, res) {
    Project.findOne({_id: req.params.projctId})
    .populate("allVersions").exec((err, project) => {
        const correntVersion = project.allVersions[project.allVersions.length - 1];
        const version = new Version({
            rejectionExplenation: "",
            projectName: correntVersion.projectName,
            editorName: req.body.editorName,
            projectDescription: correntVersion.projectDescription,
            versionNumber: correntVersion.versionNumber + 1,
            allActors: correntVersion.allActors,
            generalAssumptions: correntVersion.assumptions,
            currentAssumptions: correntVersion.currentAssumptions,
            subjects: correntVersion.subjects,

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

//=== getting all projects ===> returns all the names and id's of all projects  ===

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