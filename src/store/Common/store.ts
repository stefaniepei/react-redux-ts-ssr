import CONSTANT from './constant'
import Storage from '../../utils/storage'
import * as objectAssign from 'object-assign'
import _debug from 'debug'
const debug = _debug('app:page:Index')

const isNode = typeof window === 'undefined'

debug('isNode', isNode)
const initialState = (!isNode && typeof JSON.parse(window.__INITIAL_STATE__) === 'object' && JSON.parse(window.__INITIAL_STATE__).hasOwnProperty('commonStore'))
  ? JSON.parse(window.__INITIAL_STATE__).commonStore
  : {
    count: 0,
    locale: 'zh_CN',
    log: 'init',
    userInfo: {},
  }
debug('initialState', initialState)

export default function(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case CONSTANT.SET_LANGUAGE:
      Storage.setItem('locale', action.data)
      return objectAssign({}, state, {
        locale: action.data,
      })
    case CONSTANT.ADD:
      Storage.setItem('count', state.count + 1)
      return objectAssign({}, state, {
        count: state.count + 1,
      })
    case CONSTANT.SUB:
      Storage.setItem('count', state.count - 1)
      return objectAssign({}, state, {
        count: state.count - 1,
      })
    default:
      return objectAssign({}, state, {
        count: state.count,
        locale: state.locale,
        log: state.log,
        userInfo: state.userInfo,
      })
  }
}
