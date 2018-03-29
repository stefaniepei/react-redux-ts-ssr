/* eslint-disable no-unused-vars */
import * as React from 'react'
import * as zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'
import { Provider } from 'react-redux'
import createMemoryHistory from 'history/createMemoryHistory'
import App from './containers/App'
import configureStore from './store/createStore'

const history = createMemoryHistory()
export const store = configureStore()
// console.log(store)
export default function AppProvider() {
  return (
    <Provider store={store}>
      <LocaleProvider locale={zhCN as any}>
        <App history={history} />
      </LocaleProvider>
    </Provider>
  )
}
