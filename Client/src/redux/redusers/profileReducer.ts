import { profileTypes } from '../actions/profileAction';

const initialState = {
  loading: false,
  users: [],
  posts: [],
};

const profileReducer = (
  state = initialState,
  action: { type: string; payload: { user: string } }
) => {
  switch (action.type) {
    case profileTypes.LOADING:
      return { ...state, loading: action.payload };
    case profileTypes.GET_USER:
      return { ...state, users: [...state.users, action.payload.user] };
    case profileTypes.FOLLOW:
      return {
        // ...state,
        // users: state.users.map((user) =>
        //   user._id === action.payload ? action.payload : user
        // ),
      };
    default:
      return state;
  }
};

export default profileReducer;
