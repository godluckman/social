import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import UserModel from '../model/userModel';

interface IReq extends Request {
  user: object;
}

const auth = async (req: IReq, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(400).json({ msg: 'Invalid Auth.' });
    const decoded: any = jwt.verify(token, '123secretaccess');
    if (!decoded) return res.status(400).json({ msg: 'Invalid Auth.' });
    req.user = await UserModel.findOne({ _id: decoded.id });
    next();
  } catch (e: any) {
    return res.status(500).json({ msg: e.message });
  }
  return null;
};

export default auth;
