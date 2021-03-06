const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    ownImage: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    likes: {type: Number, default: 0},
    upload: {type: Date, default: Date.now()},
    comment: [{user: {type : mongoose.SchemaTypes.ObjectID, ref: 'User', required: false},
            text: {type: String, required: true}}],
    ownerID: {type : mongoose.SchemaTypes.ObjectID, ref: 'User', required: true}
});

module.exports = mongoose.model('Photo',photoSchema)