const express = require('express');

const router = express.Router();
const Version = require('../models/Version');
const Project = require('../models/Project');
const Actor = require('../models/Actor');
const UserStory = require('../models/UserStories');

const deleteUserStory = require("./actor")


//  === Adding user story to a specific Actor ===

router.put('/:actorId', function (req, res) {
    let { subject, title, userStory } = req.body;

    Actor.findById(req.params.actorId, (err, actor) => {

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

//       === edit user story of a specific Actor ===

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
        } else {
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

//        === getting all user stories of specific project     ===


let counter = 0;

addUserStoryToArr = (arr, userStory) => {
    arr.map(subject => {
        if (subject.subjectName === userStory.subject) {
            subject.requirements.push(userStory);
            counter++;

        }
    })
}


addSubjectsToArr = (version, subjectsArr) => {
    version.subjects.map((sub, i) => {

        let temp = {
            subjectName: sub.name,
            subjectDescreption: sub.description,
            requirements: []
        }
        subjectsArr.push(temp)
    })

}

let arrUserStoryID = [];

getUserStoryById = (storyID, requirement, res) => {
    UserStory.findById(storyID, (err, story) => {

        addUserStoryToArr(requirement.subjects, story)

    }).then(() => {
        if (counter === arrUserStoryID.length) {
            
            res.send(requirement);
            counter ++;
        }
    })
}


router.get('/reqSpec/:projectId', function (req, res) {
    var conntinue = true;
    counter = 0;

    let requirement = {
        projectName: '',
        subjects: []
    }


    Project.findById(req.params.projectId, (err, project) => {
        if (!err) {
            requirement.projectName = project.projectName;
            Version.findById(project.allVersions[project.allVersions.length - 1], (err, version) => {
                if (!err) {
                    addSubjectsToArr(version, requirement.subjects)

                    version.allActors.map((actorId, index1) => {
                        Actor.findById(actorId, (err, actor) => {
                            actor.userStoreis.map((storyID, index2) => {

                                getUserStoryById(storyID, requirement, res)
                                arrUserStoryID.push(storyID)
                            })
                        })
                    })
                } else {

                    res.send(err)
                }
            })

        } else {
            res.send(err)
        }
    })
})


//       === delete user story from a specific Actor ===


router.delete('/:actorId/:storyLocation', function (req, res) {
    Actor.findById(req.params.actorId, (err, actor) => {
        if (!err) {
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
