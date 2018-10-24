const express = require('express');

const router = express.Router();
const Version = require('../models/Version');
const Project = require('../models/Project');
const Actor = require('../models/Actor');
const UserStory = require('../models/UserStories');

const deleteUserStory = require("./actor")

// router.use(function timeLog(req, res, next) {
//     console.log('hallo Shlomo ☺')

//     next()
// })

//  === Adding user story to a specific Actor ===

router.put('/:actorId', function (req, res) {
    let { subject, title, userStory } = req.body;

    Actor.findById(req.params.actorId, (err, actor) => {
        console.log("test: ", actor);

        if (!err) {
            const newUserStory = new UserStory({
                subject: subject,
                title: title,
                userStory: userStory
            })

            newUserStory.save((err, project) => {
                if (!err) {
                    actor.userStoreis.push(newUserStory);
                    actor.save((err, project) => {
                        res.send('user story added');

                    })
                } else {
                    res.send(err);
                }
            });
        }
    })
});

//        === edit user story of a specific Actor ===

router.put('/editStory/:storyID', function (req, res) {
    let { subject, title, userStory } = req.body;
    UserStory.findById(req.params.storyID, (err, story) => {
        if (!err) {
            story.set({ subject: subject, title: title, userStory: userStory });

            story.save((err, project) => {
                if (!err) {
                    res.send("user story updated");
                }
                else {
                    res.send(err);
                }
            })
        }else{
            res.send(err)
        }
    })
});


//     === getting all user stories of specific actor ===

router.get('/allStories/:actorId', function (req, res) {
    Actor.findById(req.params.actorId, (err, actor) => {
        if (!err) {
            UserStory.find({ _id: actor.userStoreis })
                .populate("userStoreis").exec((err, project) => {
                    if (!err) {

                        res.send(project);
                    } else {
                        res.send(err);
                    }
                })

        } else {
            res.send(err);
        }
    })
});

// === getting all user stories ===
let reqSpec ={
    projectName: "",
    subject: []
} 


router.get('/allReq/:projectId', function (req, res) {
    Project.findOne({_id : req.params.projectId})
    .populate("allVersions").exec((err, project) => {
      
        reqSpec.projectName = project.projectName;
        if (!err) {
            // console.log(project.allVersions[project.allVersions.length -1]);
            Version.findOne({_id: project.allVersions[project.allVersions.length -1]})
            .populate("allActors").exec((err, project)=>{
                if (!err) {
                    console.log(project);
                    
                    project.subjects.map((sub, i)=>{
                        let temp = {
                            subjectName: sub.title,
                            subjectDescreption:sub.subject,
                            requirements: []
                        }
                    Actor.findOne({_id: project.allActors})
                    .populate("userStoreis").exec((err, project)=>{
                        console.log('====================================');
                        console.log(project);
                        console.log('====================================');
                        project.userStoreis.map((story, i)=>{
                           if(story.subject === "Login"){
                               let tempStory = {
                                requirementTitle: story.title,
                                requirement: story.userStory
                               }
                               temp.requirements.push(tempStory)
                           }
                        })
                    }) 
                    reqSpec.subject.push(temp)
                   })

                    res.send(reqSpec);
                   
                }else{
                    res.send(err);
                }
            })

        } else {
            res.send(err);
        }
        
    })
});

//       === delete user story from a specific Actor ===


router.delete('/:actorId/:storyLocation', function (req, res) {
    Actor.findById(req.params.actorId, (err, actor) => {
        if (!err) {
            console.log("actor: ", actor);
            var id = actor.userStoreis[req.params.storyLocation]
            actor.userStoreis.splice(req.params.storyLocation, 1);
            actor.save((err, project) => {
                if (!err) {
                    UserStory.findByIdAndDelete(id, (err, story) => {

                        story.save().then((result) => {
                            res.send('actor deleted');
                        }).catch((err) => {
                            res.send(err);
                        });
                    })
                } else {
                    res.send(err);
                }
            })

        } else {
            res.send(err)
        }
    })

});



module.exports = router;
