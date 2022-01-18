import { postDataApi } from '../utils/fetchData';
import AllTypes from './allTypes';
import valid, { IErr } from '../utils/valid';

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

export const register = (data: IErr) => async (dispatch: CallableFunction) => {
  const check = valid(data);
  if (check.errLength > 0) {
    return dispatch({ type: AllTypes.ALERT, payload: check.errMsg });
  }
  try {
    dispatch({ type: AllTypes.ALERT, payload: { loading: true } });
    // @ts-ignore
    const res = await postDataApi('register', data);
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
