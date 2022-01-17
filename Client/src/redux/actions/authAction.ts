import { postDataApi } from '../utils/fetchData';
import AllTypes from './allTypes';

export const login = (data: object) => async (dispatch: CallableFunction) => {
  try {
    dispatch({ type: AllTypes.ALERT, payload: { loading: true } });
    // @ts-ignore
    const res = await postDataApi('login', data);
    dispatch({
      type: AllTypes.AUTH,
      payload: { token: res.data.accessToken, user: res.data.user },
    });
    localStorage.setItem('firstLogin', 'true');
    dispatch({ type: AllTypes.ALERT, payload: { success: res.data.msg } });
  } catch (err: any) {
    dispatch({
      type: AllTypes.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
  return null;
};

export const refreshToken = () => async (dispatch: CallableFunction) => {
  const firstLogin = localStorage.getItem('firstLogin');
  if (firstLogin) {
    dispatch({ type: AllTypes.ALERT, payload: { loading: true } });
    try {
      // @ts-ignore
      const res = await postDataApi('refresh_token');
      dispatch({
        type: AllTypes.AUTH,
        payload: { token: res.data.accessToken, user: res.data.user },
      });
      dispatch({ type: AllTypes.ALERT, payload: {} });
    } catch (err: any) {
      dispatch({
        type: AllTypes.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  }
};
