// ssr by express
import * as express from 'express'
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'

import middleware from './middleware'
import AppProvider from '../../src/Provider'
import { store } from '../../src/Provider'


let app = express()

app.use(middleware.compression)

app.set('view engine', 'ejs')
app.set('views', 'src')

// app.use(express.static('assets'))
app.use(express.static('dist'))
app.use('/favicon.ico', express.static(__dirname + '../../favicon.ico'))

app.get('*', (req: any, res) => {
  const context: any = {}
  const initialState = JSON.stringify(store.getState())

  // console.log(initialState)

  const initialView = renderToString(
    <StaticRouter location={req.url} context={context} >
      <AppProvider />
    </StaticRouter>,
  )
  const helmet = Helmet.renderStatic()
  const initialTitle = helmet.title.toString()
  const initialMeta = helmet.meta.toString()
  res.render('index', { initialView, initialState, initialTitle, initialMeta })
})

export default app
