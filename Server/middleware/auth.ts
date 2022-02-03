import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(400).json({ msg: 'Invalid Auth. No token' });
    const decoded: any = jwt.verify(token, '123secretaccess');
    if (!decoded) return res.status(400).json({ msg: 'Invalid Auth.' });
    res.setHeader('X-UserId', `${decoded.id}`);
    next();
  } catch (e) {
    return res.status(500).json({ msg: (e as Error).message });
  }
  return null;
};

export default auth;
