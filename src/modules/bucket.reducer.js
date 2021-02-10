import ssjs from 'senswapjs';

/**
 * Documents
 * @default defaultData
 */
const defaultState = {}

/**
 * Get account data
 */
export const GET_ACCOUNT_DATA = 'GET_ACCOUNT_DATA';
export const GET_ACCOUNT_DATA_OK = 'GET_ACCOUNT_DATA_OK';
export const GET_ACCOUNT_DATA_FAIL = 'GET_ACCOUNT_DATA_FAIL';

export const getAccountData = (accountAddress, force = false) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_ACCOUNT_DATA });

      if (!ssjs.isAddress(accountAddress)) {
        const er = 'Invalid account address';
        dispatch({ type: GET_ACCOUNT_DATA_FAIL, reason: er });
        return reject(er);
      }

      const { bucket: { [accountAddress]: accountData } } = getState();
      if (!accountData || force) {
        return window.senwallet.src20.getAccountData(accountAddress).then(re => {
          const data = { [accountAddress]: re }
          dispatch({ type: GET_ACCOUNT_DATA_OK, data });
          return resolve(re);
        }).catch(er => {
          dispatch({ type: GET_ACCOUNT_DATA_FAIL, reason: er.toString() });
          return reject(er);
        });
      } else {
        const data = { [accountAddress]: accountData }
        dispatch({ type: GET_ACCOUNT_DATA_OK, data });
        return resolve(accountData);
      }
    });
  }
}

/**
 * Get token data
 */
export const GET_TOKEN_DATA = 'GET_TOKEN_DATA';
export const GET_TOKEN_DATA_OK = 'GET_TOKEN_DATA_OK';
export const GET_TOKEN_DATA_FAIL = 'GET_TOKEN_DATA_FAIL';

export const getTokenData = (tokenAddress, force = false) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_TOKEN_DATA });

      if (!ssjs.isAddress(tokenAddress)) {
        const er = 'Invalid token address';
        dispatch({ type: GET_TOKEN_DATA_FAIL, reason: er });
        return reject(er);
      }

      const { bucket: { [tokenAddress]: tokenData } } = getState();
      if (!tokenData || force) {
        return window.senwallet.src20.getTokenData(tokenAddress).then(re => {
          const data = { [tokenAddress]: re }
          dispatch({ type: GET_TOKEN_DATA_OK, data });
          return resolve(re);
        }).catch(er => {
          dispatch({ type: GET_TOKEN_DATA_FAIL, reason: er.toString() });
          return reject(er);
        });
      } else {
        const data = { [tokenAddress]: tokenData };
        dispatch({ type: GET_TOKEN_DATA_OK, data });
        return resolve(tokenData);
      }
    });
  }
}

/**
 * Get pool data
 */
export const GET_POOL_DATA = 'GET_POOL_DATA';
export const GET_POOL_DATA_OK = 'GET_POOL_DATA_OK';
export const GET_POOL_DATA_FAIL = 'GET_POOL_DATA_FAIL';

export const getPoolData = (poolAddress, force = false) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: GET_POOL_DATA });

      if (!ssjs.isAddress(poolAddress)) {
        const er = 'Invalid pool address';
        dispatch({ type: GET_POOL_DATA_FAIL, reason: er });
        return reject(er);
      }

      const { bucket: { [poolAddress]: poolData } } = getState();
      if (!poolData || force) {
        return window.senwallet.swap.getPoolData(poolAddress).then(re => {
          const data = { [poolAddress]: re }
          dispatch({ type: GET_POOL_DATA_OK, data });
          return resolve(re);
        }).catch(er => {
          dispatch({ type: GET_POOL_DATA_FAIL, reason: er.toString() });
          return reject(er);
        });
      } else {
        const data = { [poolAddress]: poolData };
        dispatch({ type: GET_POOL_DATA_OK, data });
        return resolve(poolData);
      }
    });
  }
}


/**
 * Set item
 */
export const SET_ITEM = 'SET_ITEM';
export const SET_ITEM_OK = 'SET_ITEM_OK';
export const SET_ITEM_FAIL = 'SET_ITEM_FAIL';

export const setItem = (value) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch({ type: SET_ITEM });

      if (!value || !value.address) {
        const er = 'Invalid value';
        dispatch({ type: SET_ITEM_FAIL, reason: er });
        return reject(er);
      }

      const key = value.address;
      const data = { [key]: value }
      dispatch({ type: SET_ITEM_OK, data });
      return resolve(data);
    });
  }
}

/**
 * Reducder
 */
export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ACCOUNT_DATA_OK:
      return { ...state, ...action.data };
    case GET_ACCOUNT_DATA_FAIL:
      return { ...state, ...action.data };
    case GET_TOKEN_DATA_OK:
      return { ...state, ...action.data };
    case GET_TOKEN_DATA_FAIL:
      return { ...state, ...action.data };
    case GET_POOL_DATA_OK:
      return { ...state, ...action.data };
    case GET_POOL_DATA_FAIL:
      return { ...state, ...action.data };
    case SET_ITEM_OK:
      return { ...state, ...action.data };
    case SET_ITEM_FAIL:
      return { ...state, ...action.data };
    default:
      return state;
  }
}