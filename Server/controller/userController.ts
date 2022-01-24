import { Request, Response } from 'express';
import UserModel from '../model/userModel';

// export interface IFollowRequest extends Request {
//   user: { _id: string };
// }

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
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findById(req.params.id)
        .select('-password')
        .populate('followers following', '-password');
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });
      res.json({ user });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
    return null;
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { avatar, fullName, mobile, address, story, gender } = req.body;
      console.log(avatar);
      if (!fullName)
        return res.status(400).json({ msg: 'Please add your full name.' });

      await UserModel.findOneAndUpdate(
        { _id: req.body._id },
        {
          avatar,
          fullName,
          mobile,
          address,
          story,
          gender,
        }
      );
      console.log('updateUser userController');
      res.json({ msg: 'Update Success!' });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
    return null;
  },
  follow: async (req: any, res: Response) => {
    try {
      const user = await UserModel.find({
        _id: req.params.id,
        followers: req.body._id,
      });
      if (user.length > 0) return res.status(500).json({ msg: 'Followed' });
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { followers: req.body._id } },
        { new: true }
      );
      await UserModel.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { following: req.params.id } },
        { new: true }
      );
      res.json({ msg: 'Followed user.' });
    } catch (e: any) {
      return res.status(500).json({ msg: e.message });
    }
    return null;
  },
  unfollow: async (req: any, res: Response) => {
    try {
      await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { followers: req.body._id } },
        { new: true }
      );
      await UserModel.findOneAndUpdate(
        { _id: req.body._id },
        { $pull: { following: req.params.id } },
        { new: true }
      );
      res.json({ msg: 'UnFollow user.' });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
};

export default userController;
