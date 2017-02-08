import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from '../services/api';

function* requestSaveExercise(action) {
  const { payload } = action;
  try {
    const response = yield call(api.saveExercise, payload);
    yield put({ type: 'POST_EXERCISE_SUCCEEDED', response });
  } catch (e) {
    yield put({ type: 'POST_EXERCISE_FAILED', message: e.message });
  }
}

function* exerciseSaga() {
  yield takeLatest('POST_EXERCISE_REQUEST', requestSaveExercise);
}

export default exerciseSaga;

