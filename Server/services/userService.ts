import UserModel from '../model/userModel';

const UserService = {
  findUser: async (userName: string | any) => {
    const users = await UserModel.find({
      userName: { $regex: userName },
    })
      .limit(10)
      .select('fullName userName avatar');
    return users;
  },
  findUserF: async (id: string, _id: string) => {
    const user = await UserModel.find({
      _id: id,
      followers: _id,
    });
    return user;
  },
  getUser: async (id: string) => {
    const user = await UserModel.findById(id)
      .select('-password')
      .populate('followers following', '-password');
    return user;
  },
  updateUser: async (
    _id: string,
    avatar: string,
    fullName: string,
    mobile: string,
    address: string,
    story: string,
    gender: string
  ) => {
    await UserModel.findOneAndUpdate(
      { _id },
      {
        avatar,
        fullName,
        mobile,
        address,
        story,
        gender,
      }
    );
  },
  followUser: async (id: string, _id: string) => {
    await UserModel.findOneAndUpdate(
      { _id: id },
      { $push: { followers: _id } },
      { new: true }
    );
    await UserModel.findOneAndUpdate(
      { _id },
      { $push: { following: id } },
      { new: true }
    );
  },
  unfollowUser: async (id: string, _id: string) => {
    const newUser = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: { followers: _id },
      },
      { new: true }
    ).populate('followers following', '-password');
    await UserModel.findOneAndUpdate(
      { _id },
      {
        $pull: { following: id },
      },
      { new: true }
    );
    return newUser;
  },
};

export default UserService;
