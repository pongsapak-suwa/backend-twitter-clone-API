const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const authControllers = require('../controllers/authControllers')
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user
 *           example: "64d2b3f5c559f8001c9d7d1b"
 *         username:
 *           type: string
 *           description: The username of the user
 *           example: "test_user_1"
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *           example: "$2b$10$C6/uETNDiD/1aYblwM2hl.VB3ZJFO9/EBfqD/dZ1je9JeFhe5K/qG"
 *         following:
 *           type: array
 *           items:
 *             type: string
 *             description: The unique identifier of the users followed by this user
 *             example: "64d2b3f5c559f8001c9d7d1c"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created
 *           example: "2023-08-14T08:23:45.123Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated
 *           example: "2023-08-14T08:23:45.123Z"
*/

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user
 *                 example: "test_user_1"
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *                 example: "password"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 username:
 *                   type: string
 *                   description: The logged-in username
 *                 accessToken:
 *                   type: string
 *                   description: The JWT access token
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       404:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid username or password. Please try again with the correct credentials."
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', authControllers.Login);

/**
 * @swagger
 * /auth/logout:
 *   delete:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "successfully logged out"
 *       500:
 *         description: Server error
 */
router.delete('/logout', verifyJWT ,authControllers.Logout);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user
 *                 example: "test_user_1"
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *                 example: "password"
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Created user successfully"
 *       400:
 *         description: Bad request, e.g., missing fields 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string   
 *                   example: "User with this already exists"
 *                   
*/
router.post('/register', authControllers.Register);

module.exports = router;