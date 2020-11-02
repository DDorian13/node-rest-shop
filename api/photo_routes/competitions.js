const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Competition =require('../photo_models/competition');
const User =require('../photo_models/user');
const Photo =require('../photo_models/photo');
const checkAuth = require('../middleware/check-auth');

router.get('/'/*,checkAuth*/,(req, res, next) => {
    Competition.find()
        .select('name deadline creator')
        .exec()
        .then(docs =>{
            res.header('Content-Range', 'Order 0-'+docs.length+'/'+docs.length);
            res.status(200).json(docs);
        })
        .catch(err=>{
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:competitionId', (req, res, next) => {
    Competition.findById(req.params.competitionId)
        .select('name deadline creator photoList')
        .populate('photoList', 'title ownImage likes')
        .exec()
        .sort('photoList.likes')
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.post('/', (req, res, next) => {
    User.findById(req.body.userId)
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: "Creator not found"
                });
            }
            const competition = new Competition({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                creator: req.body.userId,
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

router.patch('/:competitionId'/*,checkAuth*/,(req, res, next) => {
    const id = req.params.competitionId;
    const updateOps={};
    for (const ops of req.body){
        if (ops.propName === 'photoList')
            updateOps[ops.propName] += ops.value
        else
            updateOps[ops.propName] = ops.value
    }
    Competition.update({_id: id},{ $set: updateOps})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Competition updated'
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:competitionId', (req, res, next) => {
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