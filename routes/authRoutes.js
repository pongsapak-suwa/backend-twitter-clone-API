const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const authControllers = require('../controllers/authControllers')

router.post('/login', authControllers.Login);

router.delete('/logout', verifyJWT ,authControllers.Logout);

router.post('/register', authControllers.Register);

module.exports = router;