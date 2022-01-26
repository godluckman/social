import { postTypes } from '../actions/postAction';

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
      msg: string;
      posts: any[];
      result: number;
    };
  }
) => {
  switch (action.type) {
    case postTypes.CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case postTypes.LOADING_POST:
      return { ...state, loading: action.payload };
    case postTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
      };
    default:
      return state;
  }
};

export default postReducer;
