import * as React from 'react'
import * as Loadable from 'react-loadable'
import './index.scss'

const loading = ({ isLoading, error }) => {
  return isLoading && !error ? <div>loading...</div> : error ? <div>error</div> : null
}

const AdminRouters = [
  {
    path: '/',
    component: Loadable({
      loader: () => import('./Index'),
      loading,
    }),
    hasHead: true,
    exact: true,
    navOptions: {
      label: 'Home Page',
    },
  },
  {
    path: '/login',
    component: Loadable({
      loader: () => import('./Login'),
      loading,
    }),
    noHead: true,
    exact: true,
    navOptions: {
      label: 'Login Page',
    },
  },
  {
    path: '/index',
    component: Loadable({//Loadable.Map
      loader: () => import('./Index'),
      // loader: { 
      //   index: () => import('./Index'),
      //   login: () => import('./Login'),
      // },
      loading,
      render(loaded, props) {
        // let Component = loaded.index.default
        let Component = loaded.default
        return <Component {...props} />
      },
    }),
    hasHead: true,
    exact: true,
    navOptions: {
      label: 'Home Page',
    },
  },
]

export default AdminRouters
