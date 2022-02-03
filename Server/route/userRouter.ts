import { Router } from 'express';
import auth from '../middleware/auth';
import userController from '../controller/userController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - userName
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of User
 *         fullName:
 *           type: string
 *           description: FullName of user
 *         userName:
 *           type: string
 *           description: Username
 *         email:
 *           type: string
 *           description: Email of user
 *         avatar:
 *           type: string
 *           description: Avatar of user
 *         address:
 *           type: string
 *           description: Address of user
 *         gender:
 *           type: string
 *           description: User gender
 *         mobile:
 *           type: string
 *           description: Mobile of user
 *         role:
 *           type: string
 *           description: user role
 *         story:
 *           type: string
 *           description: User story
 *         createdAt:
 *           type: string
 *           description: The auto-generated time
 *         updatedAt:
 *           type: string
 *           description: The auto-generated time
 *         followers:
 *           type: array
 *           description: Array of user followers
 *         following:
 *           type: array
 *           description: Array of user following
 *       example:
 *         _id: "61e68be315bc12dcd050c3ff"
 *         fullName: "Evgeniy"
 *         userName: "username"
 *         email: "user@gmail.com"
 *         avatar: "http://localhost:3100/images/image-num.jpg"
 *         address: "Moscow"
 *         gender: "female"
 *         mobile: "+375000000000"
 *         role: "user"
 *         story: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
 *         createdAt: "2022-01-18T09:44:04.007Z"
 *         updatedAt: "2022-02-01T07:22:33.924Z"
 *         followers: [...Users]
 *         following: [...Users]
 *     UsersShort:
 *       type: object
 *       required:
 *         - userName
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of User
 *         fullName:
 *           type: string
 *           description: FullName of user
 *         userName:
 *           type: string
 *           description: Username
 *         avatar:
 *           type: string
 *           description: Avatar of user
 *       example:
 *         _id: "61e68be315bc12dcd050c3ff"
 *         fullName: "Evgeniy"
 *         userName: "username"
 *         avatar: "http://localhost:3100/images/image-num.jpg"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     security:
 *         - bearerAuth: []
 *     summary: Returns the list of users
 *     tags: [Users]
 *     parameters:
 *         - in: query
 *           name: userName
 *           schema:
 *             type: string
 *           description: User's username
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsersShort'
 */

router.get('/search', auth, userController.searchUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: cookie
 *         name: firstLogin
 *         schema:
 *           type: string
 *           default: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user _id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.get('/user/:id', auth, userController.getUser);

/**
 * @swagger
 * /api/user:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary:  Update User
 *     tags: [Users]
 *     parameters:
 *       - in: cookie
 *         name: firstLogin
 *         schema:
 *           type: string
 *           default: true
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Update Success!
 *         content:
 *           application/json:
 *             schema:
 *               example: {msg : Update Success!}
 *       404:
 *         description: The user was not found
 */

router.patch('/user', auth, userController.updateUser);

/**
 * @swagger
 * /api/user/{id}/follow:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary:  Follow User
 *     tags: [Users]
 *     parameters:
 *       - in: cookie
 *         name: firstLogin
 *         schema:
 *           type: string
 *           default: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user to follow _id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *             example:
 *               _id: _id
 *     responses:
 *       200:
 *         description: Followed user
 *         content:
 *           application/json:
 *             schema:
 *               example: {msg : Followed user.}
 *       404:
 *         description: The user was not found
 */

router.patch('/user/:id/follow', auth, userController.follow);

/**
 * @swagger
 * /api/user/{id}/unfollow:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary:  Unfollow User
 *     tags: [Users]
 *     parameters:
 *       - in: cookie
 *         name: firstLogin
 *         schema:
 *           type: string
 *           default: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user to unfollow _id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *             example:
 *               _id: _id
 *     responses:
 *       200:
 *         description: Unfollowed user
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.patch('/user/:id/unfollow', auth, userController.unfollow);

export default router;
