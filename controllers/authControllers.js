const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


const Login = asyncHandler(async (req, res) => {
    try {
        const { username , password } = req.body

        if (!username || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({username:username}).exec();

        if (!user){
            return res.status(404).json({message: "Invalid username or password. Please try again with the correct credentials."});
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(404).json({message: "Invalid username or password. Please try again with the correct credentials."});
        }

        return res.status(200).json({
            message: "successfully logged in",
            username: username,
            accesstoken: user.getAccessToken()
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

const Logout = asyncHandler(async (req, res) => {
    try {
        const id = req.userId;
        const user = await User.findById(id).exec();

        user.getAccessTokenLogout()
        return res.status(200).json({
            message: "successfully logged out",
            username: user.username,
            accesstoken: user.getAccessToken()
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
});

const Register = asyncHandler(async (req, res) => {
    try {
        const { username , password } = req.body

        if (!username || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const userEx = await User.findOne({username:username}).exec();

        if (userEx){
            return res.status(400).json({ message: "User with this already exists" });
        }

        const hashedPwd = await bcrypt.hash(password.trim(), 10);
        const createdUser = await User.create({
            username:username.trim(),
            password:hashedPwd
        });

        if(createdUser){
            return res.status(200).json({
                message: "Created user successfully"
            })
        }else{
            return res.status(400).json({ message: 'Invalid user data' });
        }

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