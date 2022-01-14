import { TYPES } from '../actions/notifyAcrion';

const initialState = {};

const notifyReducer = (
  state = initialState,
  action: { type: string; payload: object }
) => {
  switch (action.type) {
    case TYPES.NOTIFY:
      return action.payload;
    default:
      return state;
  }
};

export default notifyReducer;
