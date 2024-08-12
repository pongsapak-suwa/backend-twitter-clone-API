const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const feedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
        maxlength: 200,
    },
}, { timestamps: true });

feedSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Feed', feedSchema);