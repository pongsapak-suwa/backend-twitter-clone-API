const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const feedControllers = require('../controllers/feedControllers')
/**  
 * @swagger
 * components:
 *    schemas:
 *     Feed:
 *       type: object
 *       required:
 *         - user
 *         - text
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the feed post
 *           example: "64d2b4a1c559f8001c9d7d1e"
 *         user:
 *           type: string
 *           description: The unique identifier of the user who created the feed post
 *           example: "64d2b3f5c559f8001c9d7d1b"
 *         text:
 *           type: string
 *           description: The content of the tweet
 *           example: "Hello World! This is my first tweet."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the feed post was created
 *           example: "2023-08-14T09:45:30.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the feed post was last updated
 *           example: "2023-08-14T09:45:30.000Z"
 */

/**
 * @swagger
 * /api/feed:
 *   get:
 *     summary: Get the feed for the current user
 *     tags: [Feed]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page of results to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of results per page
 *     responses:
 *       200:
 *         description: The user's feed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 feed:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_feed:
 *                         type: string
 *                       userId_owner:
 *                         type: string
 *                       username_owner:
 *                         type: string
 *                       text:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal Server Error
 */
router.get('/feed', verifyJWT ,feedControllers.GetFeed)

/**
 * @swagger
 * /api/tweet:
 *   post:
 *     summary: Create a new tweet
 *     tags: [Feed]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 maxLength: 200
 *     responses:
 *       200:
 *         description: Successfully created tweet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 feed_id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 text:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal Server Error
 */
router.post('/tweet', verifyJWT ,feedControllers.CreateTweet)


module.exports = router;