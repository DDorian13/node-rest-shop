const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const upload = require('../middleware/uploadImage');
const checkAuth = require('../middleware/check-auth');
const Photo =require('../photo_models/photo');
const User =require('../photo_models/user');

router.get('/', checkAuth, (req, res, next) => {
    Photo.find()
        .select('_id title likes ownImage ownerID')
        .populate('ownerID', 'email')
        .exec()
        .then(docs => {
            res.header('Content-Range', 'Photo 0-'+docs.length+'/'+docs.length);
            res.status(200).send(docs.map(doc =>{
                    return{
                        _id: doc._id,
                        title: doc.title,
                        likes: doc.likes,
                        ownImage: doc.ownImage,
                        owner: doc.ownerID.email
                    }
                })
            );
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', checkAuth, upload.single('ownImage'), (req, res, next) => {
    User.findById(req.userData.userId)
        .then(product => {
            if(!product){
                return res.status(404).json({
                    message: "Owner not found"
                });
            }
            const photo = new Photo({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                ownerID: req.userData.userId,
            });
            if (req.file !== undefined)
                photo.ownImage = req.file.path;
            return photo.save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Photo uploaded successfully'
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:photoId', checkAuth, (req, res, next) => {
    const id = req.params.photoId;
    Photo.findById(id)
        .select('_id title ownImage likes comment ownerID upload categoryID competitionID')
        .populate('comment', 'user text')
        .populate('ownerID', 'email')
        .populate('categoryID', 'name')
        .populate('competitionID', 'name')
        .populate('comment.user', 'email')
        .exec()
        .then(doc =>{
            if(doc) {
                res.status(200).send(doc);
            } else{
                res.status(404).json({messages: 'No valid entry found for provided ID'})
            }

        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:photoId', checkAuth,(req, res, next) => {
    const id = req.params.photoId;
    const updateOps={};
    const updateOpsArray={};
    for (const ops of req.body){
        if (ops.propName === 'comment') {
            ops.value.user = req.userData.userId
        }
        if (ops.propName === 'categoryID' || ops.propName === 'comment' || ops.propName === 'competitionID')
            updateOpsArray[ops.propName] = (ops.value)
        else
            updateOps[ops.propName] = ops.value
    }
    Photo.update({_id: id},{ $addToSet: updateOpsArray, $set: updateOps})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Photo updated'
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:photoId', checkAuth, (req, res, next) => {
    const id = req.params.photoId;
    Photo.remove({_id: id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Photo deleted'
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

module.exports = router;