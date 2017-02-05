import { call, put, takeLatest } from 'redux-saga/effects'
import * as api from '../services/api';

function* requestRoutines(action) {
  try {
    const routines = yield call(api.getRoutines);
    yield put ({ type: 'RECEIVED_ROUTINES', routines });
  } catch (e) {
    yield put({ type: 'FETCH_ROUTINES_FAILED', message: e.message });
  }
}

function* routinesSaga() {
  yield takeLatest('REQUEST_ROUTINES', requestRoutines);
}

export default routinesSaga;

