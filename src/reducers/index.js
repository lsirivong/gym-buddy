import { combineReducers } from 'redux';
import currentUser from './user';

const gymBuddy = combineReducers({
  currentUser
});

export default gymBuddy;
