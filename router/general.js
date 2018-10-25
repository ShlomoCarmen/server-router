const express = require('express');

const router = express.Router();
const Version = require('../models/Version');
const Project = require('../models/Project');
const Actor = require('../models/Actor');
const UserStory = require('../models/UserStories');

// router.use(function timeLog(req, res, next) {
//     console.log('hallo Shlomo ☺')

//     next()
// })

// === ading project description to correct version === 

router.put('/projectDescription/:versionId', function (req, res) {
    Version.findById(req.params.versionId, (err, version) => {
        if (!err) {
            version.set({ projectDescription: req.body.projectDescription });
            version.save((err, project) => {
                if (!err) {
                    res.send("project description added");
                } else {
                    res.send(err);
                }
            })
        } else {
            res.send(err);
        }
    })
});

// === ading rejection explenation to old version ===

router.put('/rejection/:versionId', function (req, res) {
    Version.findById(req.params.versionId, (err, version) => {
        
        if (!err) {
            version.set({ rejectionExplenation: req.body.rejectionExplenation });
            version.save((err, project) => {
                if (!err) {
                    res.send("rejection explenation added");
                } else {
                    res.send(err);
                }
            })
        } else {
            res.send(err);
        }
    })
});

// === ading assumptions to correct version ===

router.put('/assumptions/:versionId', function (req, res) {
    Version.findById(req.params.versionId, (err, version) => {
        if (!err) {
            version.set({ assumptions: req.body.assumptions });
            version.save((err, project) => {
                if (!err) {
                    res.send("assumptions added");
                } else {
                    res.send(err);
                }
            })
        } else {
            res.send(err);
        }
    })
});

// === ading subjects to correct version ===

router.put('/subject/:versionId', function (req, res) {
    Version.findById(req.params.versionId, (err, version) => {
        if (!err) {
            
            version.subjects.push(req.body)
            version.save((err, project) => {
                if (!err) {
                    res.send("subject added");
                } else {
                    res.send(err);
                }
            })
        } else {
            res.send(err);
        }
    })
});



module.exports = router;
