import { Router } from 'express';

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.json({ msg: 'Hello' });
});

export default mainRouter;
