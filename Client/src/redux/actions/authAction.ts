import { postDataApi } from '../utils/fetchData';

export const TYPES = { AUTH: 'AUTH' };
export const login = (data: object) => async (dispatch: CallableFunction) => {
  try {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
    const res = await postDataApi('login', data, token);
  } catch (e) {
    return e;
  }
  return null;
};
