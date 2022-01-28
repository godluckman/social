import { getDataApi, patchDataApi } from '../utils/fetchData';
import { allTypes, deleteData } from './allTypes';
import { imageUpload } from '../utils/imageUpload';

export const profileTypes = {
  LOADING: 'LOADING_PROFILE',
  GET_USER: 'GET_PROFILE_USER',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW',
  GET_ID: 'GET_PROFILE_ID',
  GET_POSTS: 'GET_PROFILE_POSTS',
  UPDATE_POST: 'UPDATE_PROFILE_POST',
};

export interface IUser {
  _id: string;
  avatar: string;
  userName: string;
  fullName: string;
  address: string;
  email: string;
  story: string;
  mobile: string;
  gender: string;
  followers: string[];
  following: string[];
}

interface INotify {
  token: string;
  user: IUser;
}

interface IGetProps {
  id: string | undefined;
  auth: INotify;
}

interface IUpdateProps {
  userData: IUser;
  avatar: string | File;
  auth: INotify;
}

interface IFollowProps {
  user: IUser;
  auth: INotify;
  users: IUser[];
}

export const getProfileUsers =
  ({ id, auth }: IGetProps) =>
  async (dispatch: CallableFunction) => {
    dispatch({ type: profileTypes.GET_ID, payload: id });
    try {
      dispatch({ type: profileTypes.LOADING, payload: true });
      const res = getDataApi(`/user/${id}`, auth.token);
      const res1 = getDataApi(`/user_posts/${id}`, auth.token);
      const users = await res;
      const posts = await res1;
      dispatch({
        type: profileTypes.GET_USER,
        payload: users.data,
      });

      dispatch({
        type: profileTypes.GET_POSTS,
        payload: { ...posts.data, _id: id, page: 2 },
      });

      dispatch({ type: profileTypes.LOADING, payload: false });
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updateProfileUser =
  ({ userData, avatar, auth }: IUpdateProps) =>
  async (dispatch: CallableFunction) => {
    if (!userData.fullName)
      return dispatch({
        type: allTypes.ALERT,
        payload: { error: 'Please add your full name.' },
      });

    if (userData.fullName.length > 25)
      return dispatch({
        type: allTypes.ALERT,
        payload: { error: 'Your full name too long.' },
      });

    if (userData.story.length > 200)
      return dispatch({
        type: allTypes.ALERT,
        payload: { error: 'Your story too long.' },
      });
    try {
      dispatch({ type: allTypes.ALERT, payload: { loading: true } });
      const media = await imageUpload(avatar);
      const imgName = media.img.split('\\');
      const imgGet = `http://localhost:3100/images/${imgName[4]}`;
      const res = await patchDataApi(
        'user',
        {
          ...userData,
          avatar: avatar ? imgGet : auth.user.avatar,
        },
        auth.token
      );
      dispatch({
        type: allTypes.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? imgGet : auth.user.avatar,
          },
        },
      });

      dispatch({ type: allTypes.ALERT, payload: { success: res.data.msg } });
      dispatch({ type: allTypes.ALERT, payload: { loading: false } });
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
    return null;
  };

export const follow =
  ({ users, user, auth }: IFollowProps) =>
  async (dispatch: CallableFunction) => {
    let newUser;
    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }

    dispatch({ type: profileTypes.FOLLOW, payload: newUser });
    dispatch({
      type: allTypes.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });
    try {
      await patchDataApi(`user/${user._id}/follow`, auth.user, auth.token);
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unfollow =
  ({ users, user, auth }: IFollowProps) =>
  async (dispatch: CallableFunction) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = {
        ...user,
        followers: deleteData(user.followers, auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = {
            ...item,
            followers: deleteData(item.followers, auth.user._id),
          };
        }
      });
    }
    dispatch({ type: profileTypes.UNFOLLOW, payload: newUser });

    dispatch({
      type: allTypes.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          // @ts-ignore
          following: deleteData(auth.user.following, newUser._id),
        },
      },
    });
    try {
      await patchDataApi(`user/${user._id}/unfollow`, auth.user, auth.token);
    } catch (err: any) {
      dispatch({
        type: allTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
