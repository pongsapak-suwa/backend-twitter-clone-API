const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const userControllers = require('../controllers/userControllers')

/**
 * @swagger
 * /api/follow/{user_id}:
 *   put:
 *     summary: Follow a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to follow
 *     responses:
 *       200:
 *         description: Successfully followed the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user test_user_1 follow test_user_2"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Not Found."
 *       500:
 *         description: Internal Server Error
 */
router.put('/follow/:user_id', verifyJWT ,userControllers.Follow);

/**
 * @swagger
 * /api/unfollow/{user_id}:
 *   put:
 *     summary: Unfollow a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to unfollow
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user test_user_1 unfollow test_user_2"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Not Found."
 *       500:
 *         description: Internal Server Error
 */
router.put('/unfollow/:user_id', verifyJWT ,userControllers.Unfollow);

module.exports = router;