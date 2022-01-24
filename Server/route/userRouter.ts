import { Router } from 'express';
import auth from '../middleware/auth';
import userController from '../controller/userController';

const router = Router();

router.get('/search', auth, userController.searchUser);
router.get('/user/:id', auth, userController.getUser);
router.patch('/user', auth, userController.updateUser);
router.patch('/user/:id/follow', auth, userController.follow);
router.patch('/user/:id/unfollow', auth, userController.unfollow);

export default router;
