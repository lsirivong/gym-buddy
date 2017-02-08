import _ from 'lodash'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import userSagas from './sagas/user'
import exerciseSagas from './sagas/exercise'
import reducer from './reducers'
import exercises from './data/exercises.json';
import routines from './data/routines.json';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {
  exercises: exercises.exercises,
  routines: routines.routines
}

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(userSagas)
sagaMiddleware.run(exerciseSagas)

export default store

