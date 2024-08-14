const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const Follow = asyncHandler(async (req, res) => {
    try {
        const id = req.userId;
        const idFollow = req.params.user_id;

        const user = await User.findById(id);
        const followUser = await User.findById(idFollow);
        if (!user || !followUser) {
            return res.status(404).json({
                message: "User Not Found."
            })
        }

        await user.follow(followUser._id);

        return res.status(200).json({
            message: `user ${user.username} fllow ${followUser.username}`
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

const Unfollow = asyncHandler(async (req, res) => {
    try {
        const id = req.userId;
        const idFollow = req.params.user_id;

        const user = await User.findById(id);
        const followUser = await User.findById(idFollow);

        if (!user || !followUser) {
            return res.status(404).json({
                message: "User Not Found."
            })
        }

        await user.unfollow(followUser._id);

        return res.status(200).json({
            message: `user ${user.username} unfollow ${followUser.username}`
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

module.exports = {
    Follow,
    Unfollow
}