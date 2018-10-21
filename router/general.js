const express = require('express');

const router = express.Router();
const Version = require('../models/Version');
const Project = require('../models/Project');
const Actor = require('../models/Actor');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


router.put('/projectDescription/:versionId', function (req, res) {
  Version.findById(req.params.versionId, (err, version) => {
    console.log(version);
    if (!err) {
      version.set({projectDescription : req.body.projectDescription});
      version.save((err, project)=>{
        if (!err) {
            res.send("project description added");
        }else{
            res.send(err);
        }
    })
    } else {
      res.send(err);
    }
  })
});


router.put('/rejection/:versionId', function (req, res) {
  Version.findById(req.params.versionId, (err, version) => {
    console.log(version);
    if (!err) {
      version.set({rejectionExplenation : req.body.rejectionExplenation});
      version.save((err, project)=>{
        if (!err) {
            res.send("rejection explenation added");
        }else{
            res.send(err);
        }
    })
    } else {
      res.send(err);
    }
  })
  });

  

module.exports = router;
