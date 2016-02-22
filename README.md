# Hot Module Replacement (Hot Reload)

แทนที่เราจะรัน `npm run compile` เพื่อรัน `webpack` ทุกๆ ครั้ง เราจะ setup HMR กันโดยสร้าง Express server ขึ้นมา 1 ตัวที่เข้าใจ hot reload แล้วสั่งรัน server นี้ทิ้งไว้ โดยใน server เราจะรัน webpack ในนั้นแทนด้วย webpack config ตัวใหม่ที่ support HMR จากนั้นสอน server ให้เข้าใจ HMR โดยใช้ Express middlewares 2 ตัว สุดท้าย serve request ด้วยไฟล์ index.html ที่ปรับให้ path ของ assets ต่างๆ (bootstrap, fontawesome, css, jquery, js) ขึ้นต้นด้วย root '/' (แทนที่จะเป็น relative path แบบ static html)

## Install packages

```
npm i --save-dev \
babel-preset-react-hmre \
express \
webpack-dev-middleware \
webpack-hot-middleware

```

## สร้าง Hot Server

เริ่มจาก Express server แบบ basic ที่ทำหน้าที่

[1] Serve ไฟล์ static เช่น รูปภาพ, css, js, ... ใน folder `public`

[2] Handle ทุก request ด้วยไฟล์ `index.html`

```js
const path = require('path');
const express = require('express');
const devPort = 3001;

// next step

const app = express();
// next step
app.use(express.static('public')); // [1] serve static files

app.get('*', function(req, res) { // [2]
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


app.listen(devPort, ...);

```

Step ต่อไปคือสั่งรัน webpack ด้วย `hot.config.js` ที่เราจะต้องเขียนใน step ต่อไป

```js
...
const webpack = require('webpack');
...

const webpackConfig = require('../webpack/hot.config');
const compiler = webpack(webpackConfig);
...

```

Step สุดท้าย เราใช้ middlewares 2 ตัวเพื่อสอนให้ server เข้าใจ HMR

```js
...
const serverOptions = {
  noInfo: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  // watchOptions: { aggregateTimeout: 2000, poll: 1000 },
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

...
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));
...

```

โค้ด `hotServer.js` ของเราจะได้ดังนี้

```js
// hotServer.js
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const devPort = 3001;

const webpackConfig = require('../webpack/hot.config');
const compiler = webpack(webpackConfig);

const serverOptions = {
  noInfo: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  // watchOptions: { aggregateTimeout: 2000, poll: 1000 },
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const app = express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(devPort, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', devPort);
  }
});

```

## แก้ asset path ใน html

เพิ่ม '/' ข้างหน้า asset path ทุกตัวเพื่อให้ server serve ไฟล์จาก folder `public`

ตัวอย่างเช่น จาก
```
<link href="vendor/bootstrap.min.css" rel="stylesheet">
```

เป็น
```
<link href="/vendor/bootstrap.min.css" rel="stylesheet">
```

## เขียน Webpack config ตัวใหม่

จาก `compile.config.js` ที่เราเขียนไว้ก่อนหน้านี้ เราต้องเพิ่มโค้ดที่เกี่ยวกับ HMR อีกนิดหน่อยเพื่อให้ webpack เข้าใจ มีทั้งหมด 5 ส่วน ดูคำอธิบายจาก comment ในโค้ดด้านล่าง ไฟล์นี้ชื่อ `hot.config.js` ที่เราใช้สั่ง webpack ใน server

```js
// hot.config.js
var path = require('path');
var webpack = require('webpack'); // (5)
var APPPATH = path.resolve(__dirname, '..');

var jsloader = {
  test: /.js$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    presets: ['es2015', 'react'],
    env: { // (3) ใช้ babel preset ที่ทำให้โค้ดเราสนับสนุน HMR
      development: {
        presets: ['react-hmre']
      }
    }
  }
}

// export webpack config object.
module.exports = {
  entry: [ // (1) เพิ่ม client จาก hot middleware ใน entry ก่อนไฟล์ main.js
    'webpack-hot-middleware/client',
    path.join(APPPATH, 'src/main.js')
  ],
  output: {
    path: path.join(APPPATH, 'public', 'dist'),
    filename: '[name].js',
    publicPath: '/dist/' // (2) เพิ่ม publicPath ให้ server รู้ว่าต้อง serve ไฟล์จาก folder อะไร
  },
  module: {
    loaders: [jsloader]
  },
  plugins: [ // (4) เพิ่ม plugin 3 ตัวของ webpack
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

```

## สร้าง npm script เพื่อสั่งรัน server

```json
// package.json
...
"start": "node server/hotServer.js",
...
```
