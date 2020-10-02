//title, year, author, description

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product =require('../models/product');

router.get('/', (req, res, next) => {
    Product.find()
        .select('title year author desc _id')
        .exec()
        .then(docs => {
            const response = {
                //count: docs.length,
                products: docs.map(doc =>{
                    return{
                        title: doc.title,
                        year: doc.year,
                        author: doc.author,
                        desc: doc.desc,
                        _id: doc._id
                        /*request:{
                            type: 'GET',
                            url:'http://localhost:3000/products/' +doc._id
                        }*/
                    }
                })
            };
 //           if(docs.length>=0){
               res.status(200).json(response);
//            }else {
//                res.status(404).json({
//                    messages: 'No entries found'
//                })
//            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        year: req.body.year,
        author: req.body.author,
        desc: req.body.desc
    });
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
        .select('title year author desc _id')
        .exec()
        .then(doc =>{
        //console.log(doc);
        if(doc) {
            res.status(200).json({
                product: doc
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

router.patch('/:productId', (req, res, next) => {
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

router.delete('/:productId', (req, res, next) => {
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