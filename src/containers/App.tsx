import * as React from 'react'
// 公用部分css
const __SSR__ = process.env.RENDER_TYPE === 'server'
if (!__SSR__) {
  require('../assets/styles/core.scss')
  require('hotcss')
  const FastClick = require('fastclick')
  FastClick.attach(document.body)
}
// home组件里面的一些路由
import IndexRouters from '../containers/Admin/router'

// 统一路由方法
import Routers from '../routers/routers'

class App extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const routes = [...IndexRouters]
    return (
      <Routers routes={routes} history={this.props.history}>
      </Routers>
    )
  }
}

export default App
