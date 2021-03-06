import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import _debug from 'debug'
const debug = _debug('app:page:Index')

interface Props {
  history: any,
  actions: any,
  commonStore: any,
}

import { add, sub } from '../../../store/Common/actions'

@(connect(
  state => ({ commonStore: (state as any).commonStore }),
  dispatch => ({ actions: bindActionCreators({ add, sub }, dispatch) }),
) as any)
export default class Index extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  componentDidMount() {
    debug('Index', this.props, this.state)
  }
  render() {

    return (
      <div className='admin-login' style={{ marginTop: '50px' }}>
        <Helmet>
          <title>首页的标题</title>
          <meta name='keywords' content='首页的关键字' />
          <meta name='description' content='首页的描述' />
        </Helmet>
        <p><button style={{ width: '210px', height: '65px', margin: '5px' }}>{this.props.commonStore.count}</button></p>
        <button onClick={this.props.actions.add} style={{ width: '100px', height: '65px', margin: '5px' }}>加</button>
        <button onClick={this.props.actions.sub} style={{ width: '100px', height: '65px', margin: '5px' }}>减</button>
      </div>
    )
  }
}
