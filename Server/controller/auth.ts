import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../model/userModel';

const accessSecret = '123secretaccess';
const refreshSecret = 'secretrefresh123';

const createAccessToken: CallableFunction = (payload: object) =>
  jwt.sign(payload, accessSecret, { expiresIn: '1d' });
const createRefreshToken: CallableFunction = (payload: object) =>
  jwt.sign(payload, refreshSecret, { expiresIn: '30d' });

const Auth = {
  // eslint-disable-next-line consistent-return
  register: async (req: Request, res: Response) => {
    try {
      const { fullName, userName, email, password, gender } = req.body;
      const newUserName = userName.toLowerCase().replace(/ /g, '');
      const userNameFind = await UserModel.findOne({ userName: newUserName });
      const userEmailFind = await UserModel.findOne({ email });
      if (userNameFind) {
        return res.status(400).json({ msg: 'This username already exists' });
      }
      if (userEmailFind) {
        return res.status(400).json({ msg: 'This email already exists' });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: 'Password must be 6+ characters long' });
      }
      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new UserModel({
        fullName,
        userName: newUserName,
        email,
        password: passwordHash,
        gender,
      });

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      await newUser.save();

      res.json({
        msg: 'Registered',
        accessToken,
        user: { ...newUser._doc, password: '' },
      });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ msg: e.message });
    }
  },
  // eslint-disable-next-line consistent-return
  login: async (req: Request, res: Response) => {
    // eslint-disable-next-line no-empty
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email }).populate(
        'followers following',
        '-password'
      );
      if (!user) return res.status(400).json({ msg: 'Email does not exist' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Wrong password' });
      res.json({ user });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ msg: e.message });
    }
  },
  // eslint-disable-next-line consistent-return
  logout: async (req: Request, res: Response) => {
    // eslint-disable-next-line no-empty
    try {
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ msg: e.message });
    }
  },
  // eslint-disable-next-line consistent-return
  generateAccessToken: async (req: Request, res: Response) => {
    // eslint-disable-next-line no-empty
    try {
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return res.status(500).json({ msg: e.message });
    }
  },
};

export default Auth;
