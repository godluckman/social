import { Router } from 'express';
import auth from '../middleware/auth';
import postController from '../controller/postController';

const router = Router();

router.post('/posts', auth, postController.createPost);
router.get('/posts', auth, postController.getPosts);

export default router;
