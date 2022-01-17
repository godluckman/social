import { postDataApi } from '../utils/fetchData';

export const TYPES = { AUTH: 'AUTH' };
export const login = (data: object) => async (dispatch: CallableFunction) => {
  try {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    // @ts-ignore
    const res = await postDataApi('login', data);
    dispatch({
      type: 'AUTH',
      payload: { token: res.data.accessToken, user: res.data.user },
    });
    localStorage.setItem('firstLogin', 'true');
    dispatch({ type: 'NOTIFY', payload: { success: res.data.msg } });
  } catch (err: any) {
    dispatch({ type: 'NOTIFY', payload: { error: err.response.data.msg } });
  }
  return null;
};
