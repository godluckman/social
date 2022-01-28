import { postTypes } from '../actions/postAction';
import { editData } from '../actions/allTypes';

const detailPostReducer = (state = [], action: any) => {
  switch (action.type) {
    case postTypes.GET_POST:
      return [...state, action.payload];
    case postTypes.UPDATE_POST:
      return editData(state, action.payload._id, action.payload);
    default:
      return state;
  }
};

export default detailPostReducer;
