import { allTypes } from '../actions/allTypes';

const initialState = false;

const modalReducer = (
  state = initialState,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case allTypes.MODAL:
      return action.payload;
    default:
      return state;
  }
};

export default modalReducer;
