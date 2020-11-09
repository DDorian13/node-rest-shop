const mongoose = require('mongoose');

const competitionSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    deadline: {type : Date, required: true},
    creator: {type: mongoose.SchemaTypes.ObjectID, ref: 'User', required: true},
    photoList: [{type : mongoose.SchemaTypes.ObjectID, ref: 'Photo', required: false}],
    name: {type: String, required: true},
    VIP: [{type: mongoose.SchemaTypes.ObjectID, ref: 'User', required: false}],
    currentVisibility: {type: Boolean, default: true}
});

module.exports = mongoose.model('Competition',competitionSchema)