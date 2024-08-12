const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const Login = asyncHandler(async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

const Logout = asyncHandler(async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

const Register = asyncHandler(async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

module.exports = {
    Login,
    Logout,
    Register,
}