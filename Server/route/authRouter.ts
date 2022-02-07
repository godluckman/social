import { Router } from 'express';
import auth from '../controller/auth';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         fullName:
 *           type: string
 *           description: User's full name
 *         userName:
 *           type: string
 *           description: User's username
 *         password:
 *           type: string
 *           description: User's password
 *         cfPassword:
 *           type: string
 *           description: User's password duplicate
 *         email:
 *           type: string
 *           description: User's email
 *         gender:
 *           type: string
 *           description: User's gender
 *       example:
 *            cfPassword: "password"
 *            email: "email123@gmail.com"
 *            fullName: "fullname"
 *            gender: "male"
 *            password: "password"
 *            userName: "username"
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth managing API
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register new User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/User'
 *               - type: array
 *               example:
 *                 accessToken: "Bearer token"
 *                 msg: "Registered"
 *       400:
 *         description: Forbidden data
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Error message'
 *       5XX:
 *         description: Unexpected error.
 */

router.post('/register', auth.register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             example:
 *               {email: "go@daw.ru",
 *                password: "1212123"}
 *     responses:
 *       200:
 *         description: User Logged in
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/User'
 *               - type: array
 *               example:
 *                 accessToken: "Bearer token"
 *                 msg: "Logged in"
 *       400:
 *         description: Forbidden data
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Error message'
 *       5XX:
 *         description: Unexpected error.
 */

router.post('/login', auth.login);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout User
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User Logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *             example:
 *               msg: "Logged out"
 *       5XX:
 *         description: Unexpected error.
 */

router.post('/logout', auth.logout);
router.post('/refresh_token', auth.generateAccessToken);

export default router;
