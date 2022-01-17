import allTypes from '../actions/allTypes';

const initialState = {};

const alertReducer = (
  state = initialState,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case allTypes.ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
