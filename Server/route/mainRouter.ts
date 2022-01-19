import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';

const mainRouter = Router();

mainRouter.use('/api', authRouter);
mainRouter.use('/api', userRouter);

export default mainRouter;
