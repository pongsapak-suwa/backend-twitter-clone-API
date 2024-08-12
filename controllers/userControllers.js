const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const Follow = asyncHandler(async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

const Unfollow = asyncHandler(async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

module.exports = {
    Follow,
    Unfollow
}