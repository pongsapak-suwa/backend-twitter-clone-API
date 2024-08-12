const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const feedControllers = require('../controllers/feedControllers')

router.get('/feed', verifyJWT ,feedControllers.GetFeed)

router.post('/tweet', verifyJWT ,feedControllers.CreateTweet)


module.exports = router;