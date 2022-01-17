import allTypes from '../actions/allTypes';

const initialState = {};

const authReducer = (
  state = initialState,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case allTypes.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
