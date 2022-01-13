import { Router } from 'express';
import authRouter from './authRouter';

const mainRouter = Router();

mainRouter.use('/api', authRouter);

export default mainRouter;
