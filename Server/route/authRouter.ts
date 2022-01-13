import { Router } from 'express';
import auth from '../controller/auth';

const router = Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.post('/refresh_token', auth.generateAccessToken);

export default router;
