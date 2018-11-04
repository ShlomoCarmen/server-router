const express = require('express');

const router = express.Router();

const Project = require('../models/Project');


//           === posting new project ===

router.post("/newProject", function (req, res) {

    let firstVersion = new Project({
        projectName: req.body.projectName,
        allVersions: {
            rejectionExplenation: "",
            editorName: req.body.editorName,
            projectDescription: '',
            subjects: [],
            generalAssumptions: [],
            currentAssumptions: [],
            versionNumber: 1,
            allActors: []
        }
    });


    firstVersion.save(function (err, newProject) {

        if (!err) {
            res.send('new project created');
        } else {
            res.send(err);
        }
    });
});

//       === getting all data of current version of specific project ===

router.get('/allData/:projectId', function (req, res) {
    Project.findById(req.params.projectId, (err, project) => {
        if (!err) {
            currentVersion = project.allVersions[project.allVersions.length - 1];

            res.send(currentVersion);

        } else {
            res.send(err);
        }
    })

});

//               === creating new version ===

router.put('/newVersion/:projectId', function (req, res) {
    Project.findById(req.params.projectId, (err, project) => {
        if (!err) {

            let currentVersion = project.allVersions[project.allVersions.length - 1];

            newVersion = {
                rejectionExplenation: "",
                editorName: req.body.editorName,
                projectDescription: currentVersion.projectDescription,
                versionNumber: currentVersion.versionNumber + 1,
                allActors: currentVersion.allActors,
                generalAssumptions: currentVersion.generalAssumptions,
                currentAssumptions: currentVersion.currentAssumptions,
                subjects: currentVersion.subjects
            }

            project.allVersions.push(newVersion);
            project.save((err, version)=>{
                if (!err) {
                    res.send('new version creaeted');
                    
                }else{
                    res.send(err);
                }
            });

        } else {
            res.send(err)
        }
    })
});


// === getting all projects ===> returns all the names and id's of all projects  ===


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