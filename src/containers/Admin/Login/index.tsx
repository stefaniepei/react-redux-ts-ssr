import * as React from 'react'
import { Helmet } from 'react-helmet'

import _debug from 'debug'

const debug = _debug('app:page:Login')

import './Login.scss'

interface Props {
  history: any
}

class Login extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props)
    debug('Login')
  }
  componentDidMount() {

  }
  render() {

    return (
      <div className='admin-login'>
        <Helmet>
          <title>登录页的标题</title>
          <meta name='keywords' content='登录页的关键字' />
          <meta name='description' content='登录页的描述' />
        </Helmet>
        登录
      </div>
    )
  }
}


export default Login
