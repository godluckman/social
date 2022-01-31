import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const imageController = {
  storeUpload: async (req: Request, res: Response) => {
    res.json({ img: `${req.file?.path}` });
  },
  deleteFile: async (req: Request, res: Response) => {
    const imageId = req.params.id;
    const reqPath = path.join(__dirname, '../images');
    const pth = `${reqPath}/${imageId}`;
    fs.unlink(`${pth}`, (err) => {
      if (err) throw err;
    });
    res.json({ msg: 'Deleted' });
  },
};
export default imageController;
