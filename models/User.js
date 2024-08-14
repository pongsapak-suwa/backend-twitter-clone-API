const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");

require('dotenv').config()


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

}, { timestamps: true });

userSchema.plugin(uniqueValidator);

userSchema.methods.getAccessToken = function() {
    const accessToken = jwt.sign({
                "user_id": this._id,
                "username": this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {   expiresIn: "1d"}
    );
    return accessToken;
}

userSchema.methods.getAccessTokenLogout = function(authHeader) {
    const accessToken = jwt.sign({
        authHeader
        },
        process.env.ACCESS_TOKEN_SECRET,
        {   expiresIn: "1"}
    );
    return accessToken;
}

userSchema.methods.follow = function (id) {
    if(this.following.indexOf(id) === -1){
        this.following.push(id);
    }
    return this.save();
};

userSchema.methods.unfollow = function (id) {
    if(this.following.indexOf(id) !== -1){
        this.following.remove(id);
    }
    return this.save();
};

module.exports = mongoose.model('User', userSchema);