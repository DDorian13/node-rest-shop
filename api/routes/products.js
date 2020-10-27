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

const Product =require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .select('title year author desc _id productImage')
        .exec()
        .then(docs => {
            res.header('Content-Range', 'Product 0-'+docs.length+'/'+docs.length);
            res.status(200).send(docs.map(doc =>{
                    return{
                        _id: doc._id,
                        title: doc.title,
                        year: doc.year,
                        author: doc.author,
                        desc: doc.desc,
                        productImage: doc.productImage

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

router.post('/'/*,checkAuth*/, upload.single('productImage'), (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        year: req.body.year,
        author: req.body.author,
        desc: req.body.desc
    });
    if (req.file !== undefined)
        product.productImage = req.file.path;
    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created product succesfully'
            /*createdProduct: {
                title: result.title,
                year: result.year,
                author: result.author,
                desc: result.desc,
                _id: result.id
                request:{
                    type: 'POST',
                    url:'http://localhost:3000/products/' +result._id
                }
            }*/
        })
    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('title year author desc _id productImage')
        .exec()
        .then(doc =>{
        //console.log(doc);
        if(doc) {
            res.status(200).send({
                _id: doc._id,
                title: doc.title,
                year: doc.year,
                author: doc.author,
                desc: doc.desc,
                productImage: doc.productImage
                /*request:{
                    type: 'GET',
                    url:'http://localhost:3000/products/' +doc._id
                }*/
            });
        } else{
            res.status(404).json({messages: 'No valid entry found for provided ID'})
        }

    })
        .catch(err=> {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:productId'/*,checkAuth*/,(req, res, next) => {
    const id = req.params.productId;
    const updateOps ={};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id: id},{ $set: updateOps})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Product updated'
                /*request:{
                    type: 'PATCH',
                    url:'http://localhost:3000/products/' +id
                }*/
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:productId'/*,checkAuth*/,(req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Product deleted'
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