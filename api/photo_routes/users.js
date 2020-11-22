const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const Users =require("../photo_models/user");

router.post("/signup", (req, res, next) => {
    Users.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new Users({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            admin: req.body.admin
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
});

router.post('/login',(req,res,next)=>{
    Users.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length<1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            } else if (req.body.hasOwnProperty('adminfront') && req.body.adminfront == true && !user[0].admin) {
                return res.status(403).json({
                    message: 'Forbidden: Only admin can login'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(result){
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id,
                            permissions: user[0].admin
                        }, process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.delete("/:userId", checkAuth, (req, res, next) => {
    Users.findById(req.params.userId)
        .exec()
        .then(user => {
            if (!user.admin)
                Users.remove({ _id: req.params.userId })
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: "User deleted"
                    });
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/', checkAuth, checkAdmin, (req, res, next) => {
    Users.find()
        .select('_id email admin')
        .exec()
        .then(docs => {
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
                res.header('Content-Range', 'Photo '+ range[0] + '-' + range[1] + '/' +docs.length);
                let i = 0;
                for (let i = range[0]; i <= range[1]; ++i) {
                    docsRange[i - range[0]] = docs[i];
                }
                res.status(200).json(docsRange);
            } else {
                res.status(200).json(docs);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;