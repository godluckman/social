import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import imageRouter from './imageRouter';
import postRouter from './postRouter';
import commentRouter from './commentRouter';

const mainRouter = Router();

mainRouter.use('/api', authRouter);
mainRouter.use('/api', userRouter);
mainRouter.use('/api', imageRouter);
mainRouter.use('/api', postRouter);
mainRouter.use('/api', commentRouter);

export default mainRouter;
