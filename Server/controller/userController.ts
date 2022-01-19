import { Request, Response } from 'express';
import UserModel from '../model/userModel';

const userController = {
  searchUser: async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find({
        userName: { $regex: req.query.userName },
      })
        .limit(10)
        .select('fullName userName avatar');
      res.json({ users });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
    return null;
  },
};

export default userController;
