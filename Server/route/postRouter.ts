import { Router } from 'express';
import auth from '../middleware/auth';
import postController from '../controller/postController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         postId:
 *           type: string
 *           description: The auto-generated id of User
 *         content:
 *           type: string
 *           description: Comment content
 *         postUserId:
 *           type: string
 *           description: _id of user that created post
 *         user:
 *           type: object
 *           description: user logged in
 *         tag:
 *           type: object
 *           description: tag user
 *         reply:
 *           type: string
 *           description: _id comment that is replied
 *         createdAt:
 *           type: string
 *           description: The auto-generated time
 *         updatedAt:
 *           type: string
 *           description: The auto-generated time
 *         likes:
 *           type: array
 *           description: Array of user's likes comment
 *       example:
 *         comments: []
 *         content: "post description"
 *         createdAt: "time"
 *         image: "http://localhost:3100/images/image-1643610527827-588742534.jpg"
 *         likes: []
 *         updatedAt: "time"
 *         user: {_id: "61e68be315bc12dcd050c3ff", fullName: "Dilara",…}
 *         _id: "61f781a06cc76ec3d116f842"
 *     CreatePost:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           description: post description
 *         image:
 *           type: string
 *           description: post image link
 *         auth:
 *           type: object
 *           description: user logged in
 *       example:
 *          auth: { token: "Bearer token", user: {_id: "61e1220a7211969e7fbb5d0b", fullName: "Evgeniy", userName: "user1test",…}}
 *          content: "11111111111"
 *          image: "http://localhost:3100/images/image-000000000.jpg"
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary:  Create Post
 *     tags: [Posts]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreatePost'
 *     responses:
 *       200:
 *         description: Created Post!
 *         content:
 *          application/json:
 *             schema:
 *               type: object
 *             example:
 *               msg: 'Created Post!'
 *               newPost: {content: "11111111111", image: "http://localhost:3100/images/image-00000.jpg", _id: "61fcc867c3b144b90355018e"}
 *       400:
 *         description: No photo
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Please add your photo.'
 */

router.post('/posts', auth, postController.createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Returns the list of posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of user's posts
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/Post'
 *               - type: array
 *               example:
 *                 {result: 3, msg: 'Success!'}
 */

router.get('/posts', auth, postController.getPosts);

/**
 * @swagger
 * /api/post/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Edit post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post _id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               {content: 'new content',
 *               image: 'http://localhost:3100/images/image-000000000.jpg'}
 *     responses:
 *       200:
 *         description: The post content by id
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/Post'
 *               - type: array
 *               example:
 *                 msg: Updated Post!
 *       400:
 *         description: Post does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               example: {msg : This post does not exist.}
 */

router.patch('/post/:id', auth, postController.updatePost);

/**
 * @swagger
 * /api/post/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post _id
 *     responses:
 *       200:
 *         description: The post content by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Post does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               example: {msg : This post does not exist.}
 */

router.get('/post/:id', auth, postController.getPost);

/**
 * @swagger
 * /api/post/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post _id
 *     responses:
 *       200:
 *         description: Deleted Post
 *         content:
 *           application/json:
 *            schema:
 *               example: {msg : Deleted Post!}
 *       404:
 *         description: Post does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               example: {msg : This post does not exist.}
 *       5XX:
 *           description: Unexpected error.
 */

router.delete('/post/:id', auth, postController.deletePost);

/**
 * @swagger
 * /api/post/{id}/like:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary:  Like Post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Post _id
 *     responses:
 *       200:
 *         description: Liked Post!
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Liked Post!'
 *       400:
 *         description: Already liked!
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Already liked!'
 *       404:
 *         description: Post does not exist.
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'This post does not exist.'
 */

router.patch('/post/:id/like', auth, postController.likePost);

/**
 * @swagger
 * /api/post/{id}/unlike:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary:  Unlike Post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Post _id
 *     responses:
 *       200:
 *         description: Unliked
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Unliked Post!'
 *       404:
 *         description: Post does not exist.
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'This post does not exist.'
 */

router.patch('/post/:id/unlike', auth, postController.unLikePost);

/**
 * @swagger
 * /api/user_posts/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary:  Get User's Posts
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The User _id
 *     responses:
 *       200:
 *         description: Posts have been successfully gotten
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Posts do not exist.
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'This post do not exist.'
 */

router.get('/user_posts/:id', auth, postController.getUserPosts);

export default router;
