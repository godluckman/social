import { Request, Response } from 'express';

const imageController = {
  storeUpload: async (req: Request, res: Response) => {
    res.json({ img: `${req.file?.path}` });
  },
};
export default imageController;
