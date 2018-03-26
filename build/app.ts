import * as Koa from 'koa'
import * as KoaStatic from 'koa-static'
import * as convert from 'koa-convert'
import * as webpack from 'webpack'
import * as historyApiFallback from 'koa-connect-history-api-fallback'
import * as path from 'path'
import * as fs from 'fs-extra'
import * as _debug from 'debug'
import configs from '../configs'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'
import webpackConfig from './webpack.client'

const debug = _debug('app:server')
const app = new Koa()
const __DEV__ = configs.env === 'development'

app.use(convert(historyApiFallback({
  verbose: false,
})))

if (__DEV__) {
  // Enable webpack-dev and webpack-hot middleware
  const compiler = webpack(webpackConfig as any)
  const { publicPath } = webpackConfig.output
  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))
} else {
  app.use(convert(KoaStatic(configs.outDir)))
}

export default app
