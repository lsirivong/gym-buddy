import { combineReducers } from 'redux';
import routines from './routines';
import currentUser from './user';

const gymBuddy = combineReducers({
  routines,
  currentUser
});

export default gymBuddy;
