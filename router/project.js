const express = require('express');

const router = express.Router();
const Project = require('../models/Project');
const Actor = require('../models/Actor');
const Version = require('../models/Version');
const UserStory = require('../models/UserStories');


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
                    newProject.allVersions.push(newVersion);
                    newProject.save((err, project) => {
                        res.send('new project created');

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

// let counter = 0;

// addUserStoryToArr = (arr, userStory) => {
//     arr.map(subject => {
//         if (subject.subjectName === userStory.subject) {
//             subject.requirements.push(userStory);
//             counter++;

//         }
//     })
// }

// let arr = []

// router.get('/allData/:projctId', function (req, res) {
//     Project.findOne({_id: req.params.projctId})
//     .populate("allVersions").exec((err, project) => {
//         if (!err) {
//             Version.findOne({_id: project.allVersions[project.allVersions.length -1]})
//             .populate("allActors").exec((err, project)=>{
//                 if (!err) {

//                     console.log('====================================');
//                     project.allActors.map(actor=>{
//                         actor.userStoreis.map(storyId=>{
//                             arr.push(storyId)
//                             UserStory.findById(storyId, (err, story)=>{
//                                 console.log(story);
                                
//                                 // actor.userStoreisArr.push(story)
//                             })
                            
//                         })
                        
//                     })
//                     console.log(arr);
//                     console.log('====================================');

//                     res.send(project);
                   
//                 }else{
//                     res.send(err);
//                 }
//             })

//         } else {
//             res.send(err);
//         }
//     })
// });




router.get('/allData/:projctId', function (req, res) {
    Project.findOne({_id: req.params.projctId})
    .populate("allVersions").exec((err, project) => {
        if (!err) {
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
        // console.log('correntVersion: ', correntVersion); 
        const version = new Version({
            rejectionExplenation: "",
            projectName: correntVersion.projectName,
            editorName: req.body.editorName,
            projectDescription: correntVersion.projectDescription,
            versionNumber: correntVersion.versionNumber + 1,
            allActors: [],
            generalAssumptions: correntVersion.assumptions,
            currentAssumptions: correntVersion.currentAssumptions,
            subjects: correntVersion.subjects,
            
        })
        
        version.save((err, newVersion) => {
            // console.log('newVersion', newVersion);
                    correntVersion.allActors.map((actorId)=>{
                        
                        copyActor(actorId, newVersion)
                    })
            
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


copyActor = (actorId, version) =>{
    Actor.findById(actorId, (err, actor)=>{
        // console.log('actor: ', actor);
        if (!err) {
            
            const newActor = new Actor({
                name: actor.name,
                description: actor.description,
                userStoreis: []
            })
            
            newActor.save((err, newActor) => {
                
                actor.userStoreis.map((storyId)=>{
                    // console.log('version: ', version);
                    // console.log('version.allActors : ', version.allActors);
                    copyUserStoreis(storyId, newActor, version)
                    // version.allActors.push(project)
                })
            });
        } else {
            res.send(err);
        }
    })
}

copyUserStoreis = (storyId, actor, version)=>{
    UserStory.findById(storyId, (err, story)=>{
        // console.log('story', story);
        
        if (!err) {
            const newUserStory = new UserStory({
                subject: story.subject,
                title: story.title,
                userStory: story.userStory
            })

            newUserStory.save((err, story) => {
              
                if (!err) {
                    actor.userStoreis.push(story);
                    actor.save((err, project) => {
                        // console.log('project: ', project);
                        // console.log('actor: ', actor);
                        
                        
                        version.allActors.push(project);
                        console.log('====================================');
                        console.log(project);
                        console.log('====================================');
                        version.save((err, res)=>{

                            // res.send('user story added');
                        }) 

                    })
                } 
                // else {
                //     res.send(err);
                // }
            });
        }
    })
}

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