const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Competition =require('../photo_models/competition');
const User =require('../photo_models/user');
const Photo =require('../photo_models/photo');
const checkAuth = require('../middleware/check-auth');
const compVisib = require('../middleware/comp-visib');
const compDeadline = require('../middleware/comp-deadline');
const checkAdmin = require('../middleware/check-admin');

router.get('/', checkAuth, (req, res, next) => {
    Competition.find()
        .select('name deadline creator currentVisibility VIP')
        .populate('creator', 'email')
        .populate('VIP', 'email')
        .exec()
        .then(docs =>{
            docs.forEach(doc => {
                doc.currentVisibility = compVisib(doc, req);
            });
            const docsRange = [];
            if (req.headers.hasOwnProperty('range')) {

                var range = (req.headers.range).split('=');
                range = range[1].split('-');
                for (const j in range) {
                    range[j] = parseInt(range[j]);
                }

                if (range[1] > docs.length - 1) {
                    range[1] = docs.length - 1;
                }
                res.header('Content-Range', 'Competition '+ range[0] + '-' + range[1] + '/' +docs.length);
                let i = 0;
                for (let i = range[0]; i <= range[1]; ++i) {
                    docsRange[i - range[0]] = docs[i];
                }
                res.status(200).json(docsRange);
            } else {
                res.header('Content-Range', 'Competition 0-' + docs.length + '/' + docs.length);
                res.status(200).json(docs);
            }
        })
        .catch(err=>{
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:competitionId', checkAuth, (req, res, next) => {
    Competition.findById(req.params.competitionId)
        .select('name deadline creator photoList currentVisibility VIP')
        .populate({path:'photoList', select: 'title ownImage likes', options: {sort: {likes: -1}}})
        .populate('creator', 'email')
        .populate('VIP', 'email')
        .exec()
        .then(doc => {
            doc.currentVisibility = compVisib(doc, req);
            res.status(200).json(doc);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.post('/', checkAuth, checkAdmin, compDeadline, (req, res, next) => {
    User.findById(req.userData.userId)
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: "Creator not found"
                });
            }
            const competition = new Competition({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                creator: req.userData.userId,
                deadline: req.body.deadline
            });
            return competition.save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:competitionId', checkAuth, compDeadline, (req, res, next) => {
    const id = req.params.competitionId;
    const updateOps={};
    const updateOpsArray={};
    const ops = req.body
    if (ops.propName === 'photoList' || ops.propName === 'VIP')
        updateOpsArray[ops.propName] = ops.value;
    else
        updateOps[ops.propName] = ops.value;
    Competition.findById(id)
        .exec()
        .then(doc => {
            doc.currentVisibility = compVisib(doc, req);
            if (doc.currentVisibility) {
                Competition.update({_id: id}, {$set: updateOps, $addToSet: updateOpsArray})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Competition updated'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    });
            } else {
                res.status(403).json({
                    message: "Access not permitted"
                })
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:competitionId', checkAuth, checkAdmin, (req, res, next) => {
    Competition.remove({_id: req.params.competitionId})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Competition deleted'
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.put('/:competitionId', checkAuth, compDeadline, (req, res, next) => {
    const id = req.params.competitionId;
    const updateOps = {};
    const properties = Object.getOwnPropertyNames(req.body);
    for (const currProp of properties)
        updateOps[currProp] = req.body[currProp];
    Competition.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Competition updated successfully'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;