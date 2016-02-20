# Setup `webpack` และ `babel-loader`

## 1. Install packages

```
npm i --save \
react \
react-dom


npm i --save-dev \
webpack \
babel-core \
babel-loader \
babel-preset-es2015 \
babel-preset-react

```

## 2. เขียน Webpack config

สร้างไฟล์ `webpack/compile.config.js` และ exports ตัว config object ที่มี `entry`, `output` และ `loaders`

```js
var path = require('path');

// root path
var APPPATH = path.resolve(__dirname, '..');

// loader สำหรับไฟล์ .js ทุกไฟล์ยกเว้นใน node_modules
var jsloader = {
  test: /.js$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    presets: ['es2015', 'react'],
  }
}

// commonjs module export
module.exports = {
  entry: path.join(APPPATH, 'src/main.js'),
  output: {
    path: path.join(APPPATH, 'public', 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [jsloader]
  }
};

```

config นี้สั่ง webpack ให้ทำดังนี้
- ตั้งต้นจากไฟล์ `src/main.js`
- รวมโมดูลทั้งหมดที่ต้องใช้
- เมื่อเจอไฟล์ที่มีนามสกุล `.js` ให้โหลดโดยใช้ `babel-loader` แปลงไฟล์ด้วย preset `es2015` และ `react` (ยกเว้นไฟล์ใน `node_modules`)
- เซฟไฟล์ output ชื่อ `main.js` ไปที่ `public/dist`

## 3. สร้างไฟล์ entry (`src/main.js`)

ใส่แค่คำสั่ง `console.log('Yay')` ลงไปเพื่อทดลองก่อน

## 4. script tag

ใน `public/index.html` ให้โหลดไฟล์ output ที่ได้จาก webpack ใน script tag

```html
<script src="dist/main.js"></script>
```

## 5. npm script

เขียน npm script ชื่อ `compile` ใน `package.json` เพื่อรัน webpack

```
"scripts": {
  "compile": "webpack --config webpack/compile.config.js"
},
```

## 6. run
ที่ terminal รันคำสั่ง
```
npm run compile
```

เราจะได้ไฟล์ `public/dist/main.js` มา ให้ลอง double click ไฟล์ `index.html` และลองเช็คที่ console ใน Chrome devtool ดูจะพบบรรทัดนี้

```
Yay
```

แปลว่า setup เสร็จเรียบร้อย พร้อมสำหรับการเขียนโค้ดใน `src/main.js` แล้ว
