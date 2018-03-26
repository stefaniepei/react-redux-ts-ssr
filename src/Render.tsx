import * as React from 'react'
import * as ReactDom from 'react-dom'
import configs from '../configs'
import Provider from './Provider'

const render = (Component) => {
  ReactDom.render(
    <Component />,
    document.getElementById('app'),
  )
}

render(Provider)

const __DEV__ = configs.env === 'development'

if (__DEV__ && (module as any).hot) {
  (module as any).hot.accept('./Provider.tsx', () => {
    const containers = require('./Provider.tsx').default
    render(containers)
  })
}
