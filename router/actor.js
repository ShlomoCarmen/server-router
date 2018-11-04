const express = require('express');

const router = express.Router();
const Project = require('../models/Project');


//           === creating new actor ===

router.put('/:projectId', function (req, res) {

  let { name, description } = req.body;

  Project.findById(req.params.projectId, (err, project) => {

    if (!err) {

      const newActor = {
        name: name,
        description: description,
        userStoreis: [],
      }
      let currentVersion = project.allVersions[project.allVersions.length - 1];
      currentVersion.allActors.push(newActor);

      project.save((err, version) => {
        if (!err) {
          res.send('new actor added');

        } else {
          res.send(err);
        }
      });
    } else {
      res.send(err);
    }
  })
});


//    === edit actor ===

router.put('/:projectId/:index', function (req, res) {

  let { name, description } = req.body;

  Project.findById(req.params.projectId, (err, actor) => {

    if (!err) {
      let currentActor = actor.allVersions[actor.allVersions.length - 1].allActors[req.params.index];
      console.log('currentActor: ', currentActor);
      currentActor.name = name;
      currentActor.description = description;

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

//     === deletting actor === 

router.delete('/:projectId/:index', function (req, res) {

  Project.findById(req.params.projectId, (err, actor) => {

    if (!err) {
      let allActors = actor.allVersions[actor.allVersions.length - 1].allActors;
      allActors.splice(req.params.index, 1);

      actor.save((err, project) => {
        if (!err) {

          res.send('actor deleted');
        } else {
          res.send(err);
        }
      });

    }else{
      res.send(err)
    }
  })
});



module.exports = router;
