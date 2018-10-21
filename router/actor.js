const express = require('express');

const router = express.Router();
const Version = require('../models/Version');
const Project = require('../models/Project');
const Actor = require('../models/Actor');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


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

      }
    })
 
});

  router.put('/editActor/:versionID', function (req, res) {

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

      }
    })
 
});

router.delete('/:versionId/:location', function (req, res) {
  Version.findById(req.params.versionId, (err, version) => {

    version.allActors.splice(req.params.location, 1);

    version.save().then((result) => {
      res.send('actor deleted');
    }).catch((err) => {
      res.send(err);
    });
  })
});

router.delete('/:actorId', function (req, res) {
  Actor.findByIdAndDelete(req.params.actorId, (err, actor) => {

    actor.save().then((result) => {
      res.send('actor deleted');
    }).catch((err) => {
      res.send(err);
    });
  })
});


module.exports = router;
