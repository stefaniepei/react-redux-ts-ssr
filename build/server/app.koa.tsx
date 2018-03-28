import * as Koa from 'koa'
import * as KoaStatic from 'koa-static'
import * as convert from 'koa-convert'
import * as EjsRender from 'koa-ejs'
import * as historyApiFallback from 'koa-connect-history-api-fallback'
import * as path from 'path'
import * as _debug from 'debug'
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'

import configs from '../../configs'

const debug = _debug('app:server:koa')

import AppProvider from '../../src/Provider'
import { store } from '../../src/Provider'

let app = new Koa()

app.use(convert(historyApiFallback({
  verbose: false,
})))

const inRoot = path.resolve.bind(path, configs.pathBase)
const inRootSrc = (file: any) => inRoot(configs.pathBase, file)
debug(inRootSrc('src'))

EjsRender(app, {
  root: inRootSrc('src'),
  layout: 'index',
  viewExt: 'ejs',
  cache: false,
  debug: false,
})

app.use(convert(KoaStatic('dist')))
// app.use('/favicon.ico', convert(KoaStatic(__dirname + '../../favicon.ico')))

app.use(async(ctx, next) => {
  const { originalUrl } = ctx
  try {
    const context: any = {}
    const initialState = JSON.stringify(store)
    // console.log(initialState)
    const initialView = renderToString(
      <StaticRouter location={originalUrl} context={context} >
        <AppProvider />
      </StaticRouter>,
    )
    const helmet = Helmet.renderStatic()
    const initialTitle = helmet.title.toString()
    const initialMeta = helmet.meta.toString()
    await ctx.render('index', { initialView, initialState, initialTitle, initialMeta })
  } catch (e) {
    ctx.body = e.message
  }
  next && await next()
})

export default app
