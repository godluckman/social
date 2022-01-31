import { Router } from 'express';
import imageController from '../controller/imageController';
import img from '../middleware/image';

const router = Router();

router.post('/upload', img.single('image'), imageController.storeUpload);
router.delete('/delete/:id', imageController.deleteFile);

export default router;
