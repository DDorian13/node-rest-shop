const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    ownImage: {type: String, required: true},
    title: {type: String, required: true},
    likes: {type: Number, default: 0},
    upload: {type: Date, default: Date.now()},
    commentID: [{user: {type : mongoose.SchemaTypes.ObjectID, ref: 'User', required: true},
            text: {type: String, required: true}}],
    ownerID: {type : mongoose.SchemaTypes.ObjectID, ref: 'User', required: true},
    competitionID: [{type : mongoose.SchemaTypes.ObjectID, ref: 'Competition', required: false}],
    categoryID: [{type : mongoose.SchemaTypes.ObjectID, ref: 'Category', required: false}]
});

module.exports = mongoose.model('Photo',photoSchema)