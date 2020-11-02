const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    name: {type: String, required: true},
    visibility: {type: Boolean, default: true}, //false: csak owner láthatja
    creator: {type: mongoose.SchemaTypes.ObjectID, ref: 'User', required: false},
    photoList: [{type : mongoose.SchemaTypes.ObjectID, ref: 'Photo', required: false}],
    limit: {type: Number, default: 20}
});

module.exports = mongoose.model('Category',categorySchema)