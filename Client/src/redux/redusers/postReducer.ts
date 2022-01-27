import { postTypes } from '../actions/postAction';
import { editData } from '../actions/allTypes';

const initialState = {
  loading: false,
  posts: [],
  result: 0,
  page: 2,
};

const postReducer = (
  state = initialState,
  action: {
    type: string;
    payload: {
      _id: string;
      msg: string;
      posts: any[];
      result: number;
    };
  }
) => {
  switch (action.type) {
    case postTypes.CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case postTypes.LOADING_POST:
      return { ...state, loading: action.payload };
    case postTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
      };
    case postTypes.UPDATE_POST:
      return {
        ...state,
        posts: editData(state.posts, action.payload._id, action.payload),
      };
    default:
      return state;
  }
};

export default postReducer;
