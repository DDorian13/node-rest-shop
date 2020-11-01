const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    user: {type : mongoose.SchemaTypes.ObjectID, ref: 'User', required: true},
    text: {type: String, required: true}
});

module.exports = mongoose.model('Comment',commentSchema)