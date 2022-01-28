import { Router } from 'express';
import auth from '../middleware/auth';
import postController from '../controller/postController';

const router = Router();

router.post('/posts', auth, postController.createPost);
router.get('/posts', auth, postController.getPosts);
router.patch('/post/:id', auth, postController.updatePost);
router.get('/post/:id', auth, postController.getPost);
router.patch('/post/:id/like', auth, postController.likePost);
router.patch('/post/:id/unlike', auth, postController.unLikePost);
router.get('/user_posts/:id', auth, postController.getUserPosts);

export default router;
