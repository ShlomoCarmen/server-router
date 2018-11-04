const express = require('express');

const router = express.Router();
const Project = require('../models/Project');


// === adding project description to correct version === 

router.put('/projectDescription/:projectId', function (req, res) {
    Project.findById(req.params.projectId, (err, version) => {
        if (!err) {
            let currentVersion = version.allVersions[version.allVersions.length - 1];
            currentVersion.projectDescription = req.body.projectDescription
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

router.put('/rejection/:projectId', function (req, res) {
    Project.findById(req.params.projectId, (err, version) => {
        if (!err) {
            let currentVersion = version.allVersions[version.allVersions.length - 1];
            currentVersion.rejectionExplenation = req.body.rejectionExplenation
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


//  === adding general assumptions to correct version ===

router.put('/generalAssumptions/:projectId', function (req, res) {
    Project.findById(req.params.projectId, (err, version) => {
        if (!err) {
            let currentVersion = version.allVersions[version.allVersions.length - 1];
            currentVersion.generalAssumptions = req.body.generalAssumptions
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

//  === adding manual assumptions to correct version ===

router.put('/assumption/:projectId', function (req, res) {
    Project.findById(req.params.projectId, (err, version) => {
        if (!err) {
            let currentVersion = version.allVersions[version.allVersions.length - 1];
            currentVersion.currentAssumptions.push(req.body.assumption)
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


//             === edit assumption ===

router.put('/assumption/:projectId/:index', function (req, res) {
    Project.findById(req.params.projectId, (err, version) => {
        if (!err) {
            let currentVersion = version.allVersions[version.allVersions.length - 1];
            currentVersion.currentAssumptions.splice(req.params.index, 1, req.body.assumption)
            version.save((err, project) => {
                if (!err) {
                    res.send("assumptions updated");
                } else {
                    res.send(err);
                }
            })
        } else {
            res.send(err);
        }
    })
});
    
//    === delete assumptions from correct version ===

router.delete('/assumption/:projectId/:index', function (req, res) {
    Project.findById(req.params.projectId, (err, version) => {
        if (!err) {
            let currentVersion = version.allVersions[version.allVersions.length - 1];
            currentVersion.currentAssumptions.splice(req.params.index, 1)
            version.save((err, project) => {
                if (!err) {
                    res.send("assumptions deleted");
                } else {
                    res.send(err);
                }
            })
        } else {
            res.send(err);
        }
    })
});


//      === ading subjects to correct version ===

router.put('/subject/:projectId', function (req, res) {
    Project.findById(req.params.projectId, (err, version) => {
        if (!err) {
            let currentVersion = version.allVersions[version.allVersions.length - 1];
            currentVersion.subjects.push(req.body)
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
