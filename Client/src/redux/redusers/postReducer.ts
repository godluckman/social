import { postTypes } from '../actions/postAction';

const initialState = {
  posts: [],
};

const postReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case postTypes.CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };

    default:
      return state;
  }
};

export default postReducer;
