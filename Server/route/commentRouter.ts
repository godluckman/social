import { Router } from 'express';
import auth from '../middleware/auth';
import commentController from '../controller/commentController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
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
 *           content: "1212112"
 *           postId: "61f781a06cc76ec3d116f842"
 *           postUserId: "61e68be315bc12dcd050c3ff"
 *           likes: []
 *           user: {_id: "61e1220a7211969e7fbb5d0b"}
 *
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 */

/**
 * @swagger
 * /api/comment:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 */

router.post('/comment', auth, commentController.addComment);

/**
 * @swagger
 * /api/comment/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary:  Update Comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment _id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *             example:
 *               content: 'new comment'
 *
 *     responses:
 *       200:
 *         description: Update Success!
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Update Success!'
 *       404:
 *         description: The comment doesn't exist
 */

router.patch('/comment/:id', auth, commentController.updateComment);

/**
 * @swagger
 * /api/comment/{id}/like:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary:  Like Comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment _id
 *     responses:
 *       200:
 *         description: Liked Comment!
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Liked Comment!'
 *       400:
 *         description: Already liked!
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Already liked!'
 */

router.patch('/comment/:id/like', auth, commentController.likeComment);

/**
 * @swagger
 * /api/comment/{id}/unlike:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary:  Unlike Comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment _id
 *     responses:
 *       200:
 *         description: Unliked Comment!
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Unliked Comment!'
 *       404:
 *         description: Comment not found!
 */

router.patch('/comment/:id/unlike', auth, commentController.unLikeComment);

/**
 * @swagger
 * /api/comment/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary:  Delete Comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment _id
 *     responses:
 *       200:
 *         description: Deleted!
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Deleted!'
 *       404:
 *         description: The comment doesn't exist
 */

router.delete('/comment/:id', auth, commentController.deleteComment);

export default router;
