import { allTypes } from '../actions/allTypes';

const statusReducer = (state = false, action: any) => {
  switch (action.type) {
    case allTypes.STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;
