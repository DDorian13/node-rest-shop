const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    email: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User',userSchema)