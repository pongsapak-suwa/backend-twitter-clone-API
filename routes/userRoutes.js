const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const userControllers = require('../controllers/userControllers')

router.put('/follow/:user_id', verifyJWT ,userControllers.Follow);

router.delete('/unfollow/:user_id', verifyJWT ,userControllers.Unfollow);

module.exports = router;