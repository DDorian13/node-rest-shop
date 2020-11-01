const mongoose = require('mongoose');

const competitionSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    result: [{type : mongoose.SchemaTypes.ObjectID, ref: 'Photo', required: true}],
    deadline: {type : Date, required: true},
    creator: {type: mongoose.SchemaTypes.ObjectID, ref: 'User', required: true},
    photoList: [{type : mongoose.SchemaTypes.ObjectID, ref: 'Photo', required: true}],
    name: {type: String, required: true}
});

module.exports = mongoose.model('Competition',competitionSchema)