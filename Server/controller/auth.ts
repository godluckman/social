import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import UserModel from '../model/userModel';
import authService from '../services/authService';
import userService from '../services/userService';

interface IPayload {
  id: string;
}

const accessSecret = '123secretaccess';
const refreshSecret = 'secretrefresh123';

const createAccessToken: CallableFunction = (payload: IPayload) =>
  jwt.sign(payload, accessSecret, { expiresIn: '1d' });
const createRefreshToken: CallableFunction = (payload: IPayload) =>
  jwt.sign(payload, refreshSecret, { expiresIn: '30d' });

const Auth = {
  register: async (req: Request, res: Response) => {
    try {
      const { fullName, userName, email, password, gender } = req.body;
      const newUserName = userName.toLowerCase().replace(/ /g, '');
      const userNameFind = await authService.checkNewUserName(newUserName);
      const userEmailFind = await authService.checkNewUserEmail(email);
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

      const accessToken = `Bearer ${createAccessToken({ id: newUser._id })}`;
      const refreshToken = `Bearer ${createRefreshToken({ id: newUser._id })}`;

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
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await authService.login(email);
      if (!user) return res.status(400).json({ msg: 'Email does not exist' });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Wrong password' });

      const accessToken = `Bearer ${createAccessToken({ id: user._id })}`;
      const refreshToken = `Bearer ${createRefreshToken({ id: user._id })}`;

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: 'Logged in',
        accessToken,
        user: { ...user._doc, password: '' },
      });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
  logout: async (req: Request, res: Response) => {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
      return res.json({ msg: 'Logged out' });
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
  },
  generateAccessToken: async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies.refreshtoken.split(' ')[1];
      if (!refreshToken)
        return res.status(400).json({ msg: 'You must log in' });
      jwt.verify(
        refreshToken,
        refreshSecret,
        async (err: VerifyErrors | null, result: JwtPayload | undefined) => {
          if (err) return res.status(400).json({ msg: 'You must log in' });
          const user = await userService.getUser(result?.id);
          if (!user) return res.status(400).json({ msg: 'Does not exist' });
          const accessToken = `Bearer ${createAccessToken({ id: result?.id })}`;
          res.json({ accessToken, user });
          return null;
        }
      );
    } catch (e) {
      return res.status(500).json({ msg: (e as Error).message });
    }
    return null;
  },
};

export default Auth;
