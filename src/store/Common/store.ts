import CONSTANT from './constant'
import * as objectAssign from 'object-assign'

const isNode = typeof window === 'undefined'
const initialState = (!isNode && typeof window.__INITIAL_STATE__ === 'object' && window.__INITIAL_STATE__.hasOwnProperty('commonStore'))
  ? window.__INITIAL_STATE__.commonStore
  : {
    count: 0,
    locale: 'zh_CN',
  }

export default function(state = initialState, action) {
  console.log(state, action)
  switch (action.type) {
    case CONSTANT.SET_LANGUAGE:
      return objectAssign({}, state, {
        locale: action.data,
      })
    case CONSTANT.ADD:
      return objectAssign({}, state, {
        count: state.count + 1,
      })
    case CONSTANT.SUB:
      return objectAssign({}, state, {
        count: state.count - 1,
      })
    default:
      return objectAssign({}, state, {
        count: state.count,
        locale: state.locale,
      })
  }
}
