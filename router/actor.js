const express = require('express');

const router = express.Router();
const Version = require('../models/Version');
const Project = require('../models/Project');
const Actor = require('../models/Actor');
const UserStory = require('../models/UserStories');

// router.use(function timeLog(req, res, next) {
//   console.log('hallo Shlomo ☺')
//   next()
// })

//  === getting all actors ===

router.get('/allActors/:versionId', function (req, res) {
  Version.findById(req.params.versionId, (err, version) => {
    console.log(version);
    if (!err) {
      Actor.find({ _id: version.allActors })
        .populate("allActors").exec((err, project) => {
          if (!err) {
            console.log("aaaaaaaaaaaa", project);

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

// === creating new actor ===

router.put('/:versionID', function (req, res) {

  let { actorName, actorDescription } = req.body;

  Version.findById(req.params.versionID, (err, newVersion) => {
    console.log("newVersion", newVersion);

    if (!err) {

      const newActor = new Actor({
        actorName: actorName,
        actorDescription: actorDescription,
        userStoreis: []
      })

      newActor.save((err, project) => {
        if (!err) {

          newVersion.allActors.push(newActor);
          newVersion.save((err, project) => {
            res.send('new actor added');

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


// === edit actor ===

router.put('/editActor/:actorID', function (req, res) {

  let { actorName, actorDescription } = req.body;

  Actor.findById(req.params.actorID, (err, actor) => {

    if (!err) {
      actor.set({ actorName: actorName, actorDescription: actorDescription });

      actor.save((err, project) => {
        if (!err) {

          res.send('actor updated');
        } else {
          res.send(err);
        }
      });

    }
  })
});

// === deletting actor === 

router.delete('/:versionId/:location', function (req, res) {
  Version.findById(req.params.versionId, (err, version) => {
    if (!err) {
      var actorId = version.allActors[req.params.location];
      version.allActors.splice(req.params.location, 1);
      version.save((err, project) => {

        if (!err) {
          Actor.findById(actorId , (err, actor)=>{
            actor.userStoreis.map((id)=>{
              deleteUserStory(id);
            })
            deleteActor(actorId, res)
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

deleteUserStory =(userStoryId)=>{
    UserStory.findByIdAndDelete(userStoryId , (err, story)=>{
      story.save(err =>{
        console.log(err);
        
      })
    })
}

deleteActor =(actorId, res)=>{
    Actor.findByIdAndDelete(actorId , (err, actor)=>{
      actor.save(err =>{
        res.send('actor deleted' )
        
      })
    })
}


module.exports = router;
