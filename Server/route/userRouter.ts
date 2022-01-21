import { Router } from 'express';
import auth from '../middleware/auth';
import userController from '../controller/userController';

const router = Router();

router.get('/search', auth, userController.searchUser);
router.get('/user/:id', auth, userController.getUser);
router.patch('/user', auth, userController.updateUser);

export default router;
