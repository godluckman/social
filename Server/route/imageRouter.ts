import { Router } from 'express';
import imageController from '../controller/imageController';
import img from '../middleware/image';

const router = Router();

router.post('/upload', img.single('image'), imageController.storeUpload);

export default router;
