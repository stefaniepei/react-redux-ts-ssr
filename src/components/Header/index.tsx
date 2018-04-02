import * as React from 'react'
import { bindActionCreators } from 'redux'
// import connect from 'react-redux/es/connect/connect'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import './Header.scss'

interface Props {
  history: any,
  actions: any,
  commonStore: any,
}


const header = {
  navs: {
    zh_CN: [
      {
        name: '首页',
        to: '/',
      },
      {
        name: '登录',
        to: '/login',
      },
    ],
    en_US: [
      {
        name: 'Home',
        to: '/',
      },
      {
        name: 'Login',
        to: '/login',
      },
    ],
  },
  languages: {
    zh_CN: {
      name: '简体中文',
      type: 'zh_CN',
    },
    en_US: {
      name: 'ENGLISH',
      type: 'en_US',
    },
  },
  images: {
    zh_CN: {
      // webSrc: require('../../../../assets/img/web_logo.png'),
      // phoneSrc: require('../../../../assets/img/m_logo.png'),
    },
    en_US: {
      // webSrc: require('../../../../assets/img/web_logo_en.png'),
      // phoneSrc: require('../../../../assets/img/m_logo_en.png'),
    },
  },
}

import { setLanguage } from '../../store/Common/actions'

@(connect(
  state => ({ commonStore: (state as any).commonStore }),
  dispatch => ({ actions: bindActionCreators({ setLanguage }, dispatch) }),
) as any)
export default class Header extends React.PureComponent<Props, any> {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // window.addEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  handleScroll() {
    // const me = this
    // const { setHeaderZero } = me.props.Base
    // let scrollTop = 0
    // if (document.documentElement && document.documentElement.scrollTop) {
    //   scrollTop = document.documentElement.scrollTop
    // }
    // else if (document.body) {
    //   scrollTop = document.body.scrollTop
    // }
    // setHeaderZero(scrollTop === 0 ? true : false)
  }

  render() {
    const me = this
    const { locale } = me.props.commonStore

    return (
      <div className={true ? 'index-header' : 'index-header nav-collapse'}>
        <div className='logo'></div>
        <nav className='nav-wrap'>
          {
            header.navs[locale].map((item: any, index: number) => {
              return <NavLink
                to={item.to}
                className='nav-item'
                key={index}
              >
                {item.name}
              </NavLink>
            })
          }
        </nav>
        <div className='language'>
          <div className='language-wrap'>
            <span className='current-language'>{header.languages[locale].name}</span>
            <li className={!true ? 'anticon anticon-caret-down' : 'anticon anticon-caret-up'}></li>
          </div>
          <ul className={!true ? 'dropdown-toggle' : 'dropdown-toggle show'}>
            {
              Object.keys(header.languages).map((item: any, index: number) => (
                <li key={index} onClick={() => { me.props.actions.setLanguage(header.languages[item].type) }} >
                  {header.languages[item].name}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}
