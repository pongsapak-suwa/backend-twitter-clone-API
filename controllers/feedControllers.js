const User = require('../models/User');
const Feed = require('../models/Feed');

const asyncHandler = require('express-async-handler');

const GetFeed = asyncHandler(async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

const CreateTweet = asyncHandler(async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

module.exports = {
    GetFeed,
    CreateTweet,
}