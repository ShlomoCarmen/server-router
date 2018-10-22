const express = require('express');

const router = express.Router();
const Version = require('../models/Version');
const Project = require('../models/Project');
const Actor = require('../models/Actor');
const UserStory = require('../models/UserStories');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

//  === Ading user story to a specific Actor ===
 
// router.put('/:actorId', function (req, res) {
//     Actor.findById(req.params.actorId, (err, actor) => {
//         if (!err) {
//             console.log(actor);
//             actor.userStoreis.push(req.body.userStory);
//             actor.save((err, project)=>{
//                 if (!err) {
//                     res.send("user story added");
//                 }else{
//                     res.send(err);
//                 }
//             })
//         }
//     })
// });
 
router.put('/:actorId', function (req, res) {
    let { subject, title, userStory } = req.body;

    Actor.findById(req.params.actorId, (err, actor) => {
      console.log(actor);

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

router.put('/:actorId/:storyLocation', function (req, res) {
    Actor.findById(req.params.actorId, (err, actor) => {
        console.log(actor);
        if (!err) {
            console.log("aaaaaaaaaaaaaaa",req.params.storyLocation);
            const story = actor.userStoreis[req.params.storyLocation];
            actor.set({ userStoreis, $position: req.params.storyLocation });

            console.log(story);
            
            // actor.userStoreis[int] = req.body.userStory
            // actor.save((err, project)=>{
            //     if (!err) {
            //         res.send("user story updated");
            //     }
            //     else{
            //         res.send(err);
            //     }
            // })
        }
    })
});

//       === delete user story from a specific Actor ===

router.delete('/:actorId/:storyLocation', function (req, res) {
    Actor.findById(req.params.actorId, (err, actor) => {
        if (!err) {
            console.log(actor);
            actor.userStoreis.splice(req.params.storyLocation, 1)
            actor.save((err, project)=>{
                if (!err) {
                    res.send("user story deleted");
                }else{
                    res.send(err);
                }
            })
        }
    })
   
});

  

module.exports = router;
