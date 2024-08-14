const User = require('../models/User');
const Feed = require('../models/Feed');

const asyncHandler = require('express-async-handler');

const GetFeed = asyncHandler(async (req, res) => {
    try {
        const id = req.userId;
        const user = await User.findById(id).exec();
        const followList = user.following && user.following.length > 0 ? user.following : [];
        followList.push(id);

        const Allfeed = await Feed.find({user: {$in: followList}}).sort({ createdAt: 'desc' }).populate('user', 'username').exec();
        const tranfeed = Allfeed.map((feed) => ({
            id_feed: feed._id,
            userId_owner: feed.user._id,
            username_owner: feed.user.username,
            text: feed.text,
            createdAt: feed.createdAt
        }))

        return res.status(200).json({
            feed: tranfeed
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

const CreateTweet = asyncHandler(async (req, res) => {
    try {
        const id = req.userId;
        const { text } = req.body;

        if (!text){
            return res.status(400).json({message: "field are required"});
        }

        if (text.length > 200){
            return res.status(400).json({message: "text over 200."});
        }

        const tweet = await Feed.create({ user: id, text:text });
        await tweet.save()

        return res.status(200).json({
            feed_id: tweet._id,
            user: tweet.user,
            text: tweet.text,
            createdAt: tweet.createdAt
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

module.exports = {
    GetFeed,
    CreateTweet,
}