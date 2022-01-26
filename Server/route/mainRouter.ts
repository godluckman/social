import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import imageRouter from './imageRouter';
import postRouter from './postRouter';

const mainRouter = Router();

mainRouter.use('/api', authRouter);
mainRouter.use('/api', userRouter);
mainRouter.use('/api', imageRouter);
mainRouter.use('/api', postRouter);

export default mainRouter;
