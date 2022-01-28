import { Router } from 'express';
import auth from '../middleware/auth';
import commentController from '../controller/commentController';

const router = Router();

router.post('/comment', auth, commentController.createComment);
router.patch('/comment/:id', auth, commentController.updateComment);
router.patch('/comment/:id/like', auth, commentController.likeComment);
router.patch('/comment/:id/unlike', auth, commentController.unLikeComment);
router.delete('/comment/:id', auth, commentController.deleteComment);

export default router;
