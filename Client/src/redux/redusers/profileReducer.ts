import { profileTypes } from '../actions/profileAction';
import { editData } from '../actions/allTypes';

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: [],
};

const profileReducer = (
  state = initialState,
  action: {
    type: string;
    payload: {
      _id: string;
      user: string;
    };
  }
) => {
  switch (action.type) {
    case profileTypes.LOADING:
      return { ...state, loading: action.payload };
    case profileTypes.GET_USER:
      return { ...state, users: [...state.users, action.payload.user] };
    case profileTypes.FOLLOW:
      return {
        ...state,
        users: editData(state.users, action.payload._id, action.payload),
      };
    case profileTypes.UNFOLLOW:
      return {
        ...state,
        users: editData(state.users, action.payload._id, action.payload),
      };
    case profileTypes.GET_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload],
      };
    case profileTypes.GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    default:
      return state;
  }
};

export default profileReducer;
