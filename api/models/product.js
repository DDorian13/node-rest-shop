const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    year: {type: String, required: true},
    author: {type: String, required: true},
    desc: {type: String, required: true}
});

module.exports = mongoose.model('Product',productSchema)