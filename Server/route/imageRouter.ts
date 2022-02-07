import { Router } from 'express';
import imageController from '../controller/imageController';
import img from '../middleware/image';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: The images managing API
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: upload image
 *     tags: [Images]
 *     requestBody:
 *       content:
 *         image/png:
 *           schema:
 *              type: string
 *              format: binary
 *     responses:
 *       200:
 *         description: The image was successfully uploaded
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               img: 'file path'
 *       500:
 *         description: Some server error
 */

router.post('/upload', img.single('image'), imageController.storeUpload);

/**
 * @swagger
 * /api/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary:  Delete image
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The image name
 *     responses:
 *       200:
 *         description: Deleted!
 *         content:
 *          application/json:
 *             schema:
 *               type: string
 *             example:
 *               msg: 'Deleted!'
 *       500:
 *         description: Some server error
 */

router.delete('/delete/:id', imageController.deleteFile);

export default router;
