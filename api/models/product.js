const mongoose = require('mongoose');
//ábel
const productSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    title: {type: String, required: true},
    year: {type: String, required: true},
    author: {type: String, required: true},
    desc: {type: String, required: true}
});

module.exports = mongoose.model('Product',productSchema)