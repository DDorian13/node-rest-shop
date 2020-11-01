const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Category =require('../photo_models/category');
const User =require('../photo_models/user');
const Photo =require('../photo_models/photo');
const checkAuth = require('../middleware/check-auth');

router.get('/'/*,checkAuth*/,(req, res, next) => {
    Category.find()
        .select('name visibility creator limit')
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

router.get('/:categoryId', (req, res, next) => {
    Category.findById(req.params.categoryId)
        .select('name visibility creator limit photoList')
        .populate('photoList', 'title ownImage')
        .exec()
        .then(doc => {
            if(req.userData._id === doc.creator || doc.visibility) {
                res.status(200).json(doc);
            } else
                res.status(404).json({messages: 'No valid entry found for provided ID'})
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
            const category = new Category({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                creator: req.body.userId,
                visibility: req.body.visibility,
                limit: req.body.limit
            });
            return category.save()
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

router.patch('/:categoryId'/*,checkAuth*/,(req, res, next) => {
    const id = req.params.categoryId;
    const updateOps={};
    for (const ops of req.body){
        if (ops.propName === 'photoList')
            updateOps[ops.propName] += ops.value
        else
            updateOps[ops.propName] = ops.value
    }
    Photo.update({_id: id},{ $set: updateOps})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Category updated'
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:categoryId', (req, res, next) => {
    Category.remove({_id: req.params.categoryId})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Category deleted'
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});