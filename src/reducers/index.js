import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'
import currentUser from './user'
import routines from './routines'
import exercises from './exercises'
import selectedRoutine from './selectedRoutine/'

const combinedReducer = combineReducers({
  currentUser,
  routines,
  exercises,
  selectedRoutine,
})

const featureReducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
};

const rootReducer = reduceReducers(
  combinedReducer,
  featureReducer,
);

export default rootReducer

