const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Order =require('../models/order');
const Product =require('../models/product');
const checkAuth = require('../middleware/check-auth');

router.get('/'/*,checkAuth*/,(req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'productImage title')
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

router.post('/'/*,checkAuth*/,(req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save()
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

router.get('/:orderId'/*,checkAuth*/,(req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product','title')
        .exec()
        .then(order =>{
            if(!order){
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            res.status(200).json(order);
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:orderId'/*,checkAuth*/,(req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id: id})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: 'Order deleted'
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