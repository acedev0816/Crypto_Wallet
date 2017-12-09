import { combineReducers } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  createApiActionCreators,
  createReducer,
  createActionType,
  REQUEST,
  SUCCESS,
} from '../../common/utils/reduxHelpers';
import api from './api';

/**
 * ACTION TYPES
 */
export const CREATE_WALLET = 'wallet/CREATE_WALLET';

/**
 * ACTIONS
 */
export const createWalletActions = createApiActionCreators(CREATE_WALLET);

/**
 * REDUCERS
 */
const initialState = {
  wallets: [],
};

const wallets = createReducer(initialState.wallets, {
  [CREATE_WALLET]: {
    [SUCCESS]: (state, payload) => payload,
  },
});

export default combineReducers({
  wallets,
});

/**
 * SELECTORS
 */
export const selectWallet = state => state.wallet;

export const selectWallets = state => selectWallet(state).wallets;

/**
 * SAGAS
 */
function* createWallet({ payload }) {
  const resp = yield call(api.createWallet, payload);

  // TODO
  console.log(resp);
  return;

  if (resp.ok) {
    yield put(createWalletActions.success(resp.data));
  }
}

export function* walletSaga() {
  yield takeLatest(createActionType(CREATE_WALLET, REQUEST), createWallet);
}
