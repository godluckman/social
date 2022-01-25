import { Router } from 'express';
import auth from '../middleware/auth';
import postController from '../controller/postController';

const router = Router();

router.post('/posts', auth, postController.createPost);

export default router;
