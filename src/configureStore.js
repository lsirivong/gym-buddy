import _ from 'lodash'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import userSagas from './sagas/user'
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(userSagas)

export default store;

