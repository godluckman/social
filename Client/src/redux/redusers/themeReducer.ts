import { allTypes } from '../actions/allTypes';

const initialState = false;

const themeReducer = (
  state = initialState,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case allTypes.THEME:
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;
