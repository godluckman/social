import UserModel from '../model/userModel';

const authService = {
  checkNewUserName: async (newUserName: string) => {
    const user = await UserModel.findOne({ userName: newUserName });
    return user;
  },
  checkNewUserEmail: async (email: string) => {
    const user = await UserModel.findOne({ email });
    return user;
  },
  login: async (email: string) => {
    const user = await UserModel.findOne({ email }).populate(
      'followers following',
      '-password'
    );
    return user;
  },
};

export default authService;
