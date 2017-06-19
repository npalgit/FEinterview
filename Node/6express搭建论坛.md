## express脚手架搭建应用

npm install express-generator -g安装
express appname 执行，生成后端代码
->此时生成的代码是后端代码，需要放入src/server中

## vue-cli搭建应用
npm install -g vue-cli 安装
vue init webpack appname
->此时生成的src是客户端的，需要放入src/client中

## 配置webpack
应该在开发环境中以 Express 中间件的形式部署 Webpack：webpack 并不会把打包好的代码生成在磁盘上，而是保留在内存里、
->webpackDevMiddleware, webpackHotMiddleware 
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true },
}))
这样每次启动 Express 后，Webpack 中间件会拦截 config.output.publicPath 地址的请求并返回正确的结果，同时，如果被 Webpack 监听的文件发生变动，会立即通知前端产生相应变化。

## Nodemon监听server代码
因为我们已经有 Webpack 监听前端代码了，所以得做相关配置让 Nodemon 只监听某一块代码。

## 配置package.json
script: {
  dev: node index.js
}

