# ย้าย Code HTML ไปใน React Component

เวลาทำงานกับ Designer เราจะได้ไฟล์ HTML มา ดังนั้นเราจึงต้องย้ายโค้ด html ไปอยู่ใน Components ต่างๆ

## 1. เตรียม div ว่างๆ 1 ตัวใน HTML
Cut โค้ด HTML ทั้งหมดที่อยู่ใน `<body>` แล้วสร้าง div ว่างๆ 1 ตัวที่มี id ว่า `"app"` รอให้ ReactDOM render มาใส่

```html
<div id="app"></div>
```

## 2. สร้าง `App` component

ใน `main.js`, สร้าง `App` component แล้ว render ด้วย ReactDOM

```js
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      // <-- paste html code here
    )
  }
}

// Render App ไปที่ div#app
ReactDOM.render(<App />, document.getElementById('app'));
```
ใน render(), paste โค้ด HTML ลงไปแล้วสั่ง Render App ไปที่ div#app ที่เตรียมไว้ในขั้นตอนแรก

## 3. ลอง compile

```
npm run compile
```

จะพบว่า error เนื่องจาก JSX ใน component ไม่ใช่ html เป็นแค่ syntax sugar เราจึงต้องแก้ไขโค้ดก่อน หลังจากแก้ไขแล้วลองรัน compile อีกครั้ง จะพบว่าใช้ได้แล้ว

# โค้ดที่ต้องแก้ไข
### - ลบ html comment `<!-- -->`
### - Close tag `<hr />`, `<img />`
### - เปลี่ยน `class=` ให้เป็น `className=`
### - เปลี่ยน `for=` ให้เป็น `htmlFor=`
### - Inline style จาก `style=".."` เป็น `style={obj}`

ดูลิ้งค์ [DOM Differences](https://facebook.github.io/react/docs/dom-differences.html) เพิ่มเติม
