const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
        console.log(file.originalname);
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='image/jpg'||file.mimetype=== 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }


}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Photo =require('../photo_models/photo');
const User =require('../photo_models/user');

router.get('/', (req, res, next) => {
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

router.post('/'/*,checkAuth*/, upload.single('ownImage'), (req, res, next) => {
    User.findById(req.body.ownerID)
        .then(product => {
            if(!product){
                return res.status(404).json({
                    message: "Owner not found"
                });
            }
            const photo = new Photo({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                ownerID: req.body.ownerID,
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

router.get('/:photoId', (req, res, next) => {
    const id = req.params.photoId;
    Photo.findById(id)
        .select('_id title ownImage likes commentID ownerID upload categoryID competitionID')
        .populate('commentID', 'user text')
        .populate('user', 'email')
        .populate('ownerID', 'email')
        .populate('categoryID', 'name')
        .populate('competitionID', 'name')
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

router.patch('/:photoId'/*,checkAuth*/,(req, res, next) => {
    const id = req.params.photoId;
    const updateOps={};
    for (const ops of req.body){
        if (ops.propName === 'categoryID' || ops.propName === 'commentID' || ops.propName === 'competitionID')
            updateOps[ops.propName] += ops.value
        else
            updateOps[ops.propName] = ops.value
    }
    Photo.update({_id: id},{ $set: updateOps})
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

router.delete('/:photoId'/*,checkAuth*/,(req, res, next) => {
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