import { call, put, takeLatest } from 'redux-saga/effects'
import * as API from '../services/api';

function* requestLogin(action) {
  const { email, password } = action.payload;
  try {
    const user = yield call(API.login, email, password);
    yield put ({ type: 'LOGIN_SUCCEEDED', user  });
  } catch (e) {
    yield put({ type: 'LOGIN_FAILED', message: e.message });
  }
}

function* userSaga() {
  yield takeLatest('LOGIN_REQUESTED', requestLogin);
}

export default userSaga;

