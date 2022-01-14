import { combineReducers } from 'redux';
import auth from './authReducer';
import notify from './notidyReducer';

export default combineReducers({ auth, notify });
