const mongoose = require('mongoose');

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

module.exports = mongoose.model('Feed', feedSchema);