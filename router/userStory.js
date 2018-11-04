const express = require('express');

const router = express.Router();
const Project = require('../models/Project');

//  === Adding user story to a specific Actor ===

router.put('/:projectId/:index', function (req, res) {
    let { subject, title, userStory } = req.body;

    Project.findById(req.params.projectId, (err, actor) => {

        if (!err) {
            const newUserStory = {
                subject: subject,
                title: title,
                userStory: userStory
            }
            let currentActor = actor.allVersions[actor.allVersions.length - 1].allActors[req.params.index];
            currentActor.userStoreis.push(newUserStory);

            actor.save((err, project) => {
                if (!err) {
                    res.send('user story added');
                } else {
                    res.send(err);
                }
            });
        }
    })
});

//       === edit user story of a specific Actor ===

router.put('/:projectId/:actorIndex/:storyIndex', function (req, res) {
    Project.findById(req.params.projectId, (err, actor) => {
        if (!err) {
            let currentActor = actor.allVersions[actor.allVersions.length - 1].allActors[req.params.actorIndex];
            currentActor.userStoreis.splice(req.params.storyIndex, 1, req.body);

            actor.save((err, project) => {
                if (!err) {
                    res.send("user story updated");
                }
                else {
                    res.send(err);
                }
            })
        } else {
            res.send(err);
        }
    })
});

//                 === delete user story from a specific Actor ===

router.delete('/:projectId/:actorIndex/:storyIndex', function (req, res) {
    Project.findById(req.params.projectId, (err, actor) => {
        if (!err) {
            let currentActor = actor.allVersions[actor.allVersions.length - 1].allActors[req.params.actorIndex];
            currentActor.userStoreis.splice(req.params.storyIndex, 1);

            actor.save((err, project) => {
                if (!err) {
                    res.send("user story deleted");
                }
                else {
                    res.send(err);
                }
            })
        } else {
            res.send(err)
        }
    })
});


//       === getting all user stories of specific project     ===

router.get('/allStories/:projectId', function (req, res) {

    let requirement = {
        projectName: '',
        subjects: []
    }

    Project.findById(req.params.projectId, (err, project) => {
        if (!err) {
            let subjects = project.allVersions[project.allVersions.length - 1].subjects;
            let allActors = project.allVersions[project.allVersions.length - 1].allActors;

            requirement.projectName = project.projectName

            addSubjectsToArr(subjects, requirement.subjects);
            allActors.map(actor=>{
                actor.userStoreis.map(story=>{

                    addUserStoryToArr(requirement.subjects, story)
                })
            })

            res.send(requirement);
        } else {
            res.send(err);
        }
    })
});

addSubjectsToArr = (subjects, subjectsArr) => {
    subjects.map((sub, i) => {

        let temp = {
            subjectName: sub.name,
            subjectDescreption: sub.description,
            requirements: []
        }
        subjectsArr.push(temp)
    })
}

addUserStoryToArr = (arr, userStory) => {
    arr.map(subject => {
        if (subject.subjectName === userStory.subject) {
            subject.requirements.push(userStory);

        }
    })
}


module.exports = router;
