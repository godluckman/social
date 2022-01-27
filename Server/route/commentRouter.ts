import { Router } from 'express';
import auth from '../middleware/auth';
import commentController from '../controller/commentController';

const router = Router();

router.post('/comment', auth, commentController.createComment);

export default router;
