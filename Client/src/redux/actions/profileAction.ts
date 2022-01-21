import { getDataApi, patchDataApi } from '../utils/fetchData';
import allTypes from './allTypes';
import { imageUpload } from '../utils/imageUpload';

export const profileTypes = {
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
};

export interface IUser {
  _id: string;
  avatar: any;
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
  users: IUser[];
}

interface IUpdateProps {
  userData: IUser;
  avatar: string | File;
  auth: INotify;
}

export const getProfileUsers =
  ({ users, id, auth }: IGetProps) =>
  async (dispatch: CallableFunction) => {
    if (users.every((user: IUser) => user._id !== id)) {
      try {
        dispatch({ type: profileTypes.LOADING, payload: true });
        const res = await getDataApi(`/user/${id}`, auth.token);
        dispatch({ type: profileTypes.GET_USER, payload: res.data });
        dispatch({ type: profileTypes.LOADING, payload: false });
      } catch (err: any) {
        dispatch({
          type: allTypes.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
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
      const res = await patchDataApi(
        'user',
        {
          ...userData,
          avatar: avatar ? media.msg.img : auth.user.avatar,
        },
        auth.token
      );
      console.log(res);
      dispatch({
        type: allTypes.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media.msg.img : auth.user.avatar,
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
