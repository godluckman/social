import { Request, Response } from 'express';
import UserService from '../services/userService';

const userController = {
  searchUser: async (req: Request, res: Response) => {
    try {
      const users = await UserService.findUser(req.query.userName);
      res.json({ users });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await UserService.getUser(req.params.id);
      if (!user) return res.status(400).json({ msg: 'User does not exist.' });
      res.json({ user });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const { avatar, fullName, mobile, address, story, gender } = req.body;
      if (!fullName)
        return res.status(400).json({ msg: 'Please add your full name.' });
      await UserService.updateUser(
        req.body._id,
        avatar,
        fullName,
        mobile,
        address,
        story,
        gender
      );
      res.json({ msg: 'Update Success!' });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
  follow: async (req: any, res: Response) => {
    try {
      const user = await UserService.findUserF(req.params.id, req.body._id);
      if (user.length > 0) return res.status(500).json({ msg: 'Followed' });
      await UserService.followUser(req.params.id, req.body._id);
      res.json({ msg: 'Followed user.' });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
  unfollow: async (req: any, res: Response) => {
    try {
      const newUser = await UserService.unfollowUser(
        req.params.id,
        req.body._id
      );
      res.json({ newUser });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
};

export default userController;
