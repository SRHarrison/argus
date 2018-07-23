import { call, takeEvery, select, put } from 'redux-saga/effects';
import { route, getHash, getHashParameters } from 'react-hash-route';
import { csvParse } from 'd3-dsv';
import 'whatwg-fetch';

import extend from 'lodash/extend';

import { queryObject, queryString, routeString } from 'utils/queries';

import { NAVIGATE, LOAD_DATA, S3_URL } from './constants';
import { selectRequestedAt } from './selectors';
import { dataRequested, loadError, dataLoaded } from './actions';

/**
 * Navigate to location, calls router
 * @param {object} payload location: the new location, args: query arguments
 * @return {void}
 */
export function* navigateSaga({ location, args }) {
  const hash = yield getHash();
  const params = yield queryObject(getHashParameters());

  // default args
  const xArgs = extend({
    remove: false,
  }, args || {});

  // update path: replace or keep if not provided
  const path = typeof location === 'string' ? location : (location.path || hash);
  // update search query
  let query = '';
  if (location.query) {
    query = queryString(xArgs.remove
      // remove: ignore all previous params and only use new params
      ? location.query
      // keep: merge previous and new params
      : extend(params, location.query)
    );
  }
  // combine path and query if present
  yield call(route, routeString(path, query));
}

export function* loadDataSaga({ key, value }) {
  const requestedAt = yield select(selectRequestedAt, key);
  if (!requestedAt) {
    try {
      // First record that we are requesting
      yield put(dataRequested(key, Date.now()));
      if (value.source === 'json') {
        // fetch json file
        const path = `${value.path}${value.filename}`;
        const response = yield fetch(path);
        const responseBody = yield response.json();
        if (responseBody) {
          yield put(dataLoaded(key, responseBody));
        }
      }
      if (value.source === 's3' || value.source === 'csv') {
        const path = value.source === 's3'
          ? `${S3_URL.replace('{bucket}', value.bucket)}${value.path}${value.filename}`
          : `${value.path}${value.filename}`;
        const response = yield fetch(path);
        const responseBody = yield response.text();
        if (responseBody) {
          yield put(dataLoaded(key, csvParse(responseBody)));
        }
      }
    } catch (err) {
      // Whoops Save error
      yield put(loadError(err, key));
      // Clear the request time on error, This will cause us to try again next time, which we probably want to do?
      yield put(dataRequested(key, null));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery(NAVIGATE, navigateSaga);
  yield takeEvery(LOAD_DATA, loadDataSaga);
}
