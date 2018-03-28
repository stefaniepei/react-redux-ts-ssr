import * as React from 'react'
import * as ReactDom from 'react-dom'
import configs from '../configs'
import AppProvider from './Provider'

const render = (Component) => {
  configs.render === 'server' ?
    ReactDom.hydrate(
      <Component />,
      document.getElementById('app'),
    ) :
    ReactDom.render(
      <Component />,
      document.getElementById('app'),
    )
}

render(AppProvider)

const __DEV__ = configs.env === 'development'

if (__DEV__ && (module as any).hot) {
  (module as any).hot.accept('./Provider.tsx', () => {
    const containers = require('./Provider.tsx').default
    render(containers)
  })
}
