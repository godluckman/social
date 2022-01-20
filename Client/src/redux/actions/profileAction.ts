import { getDataApi } from '../utils/fetchData';
import allTypes from './allTypes';

export const profileTypes = {
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
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
  followers: [];
  following: [];
}

interface INotify {
  token: string;
  user: IUser;
}

interface Props {
  id: string | undefined;
  auth: INotify;
  users: IUser[];
}

export const getProfileUsers =
  ({ users, id, auth }: Props) =>
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
