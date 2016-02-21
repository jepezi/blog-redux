# เขียน `<Nav />` กับ `<Footer />`

React แนะนำให้เขียน component เล็กๆ ที่แยกทำหน้าที่ของตัวเอง ซึ่งสามารถ Reuse ได้ ในตัวอย่างนี้ ลองเขียน component `<Nav />` และ `<Footer />` ที่แตกมาจาก `<App />` ใน `main.js`

## Stateless Component

React Component ที่เขียนด้วย class สามารถมี state เป็นของตัวเองได้ รวมไปถึงพวก Life cycle method ต่างๆ (เช่น componentDidMount, ...) แต่ถ้า Component ของเราไม่จำเป็นต้องมี state และ Life cycle method โดยหน้าที่หลักๆ คือรับ props และ render เท่านั้น เราสามารถเขียน Component ได้ด้วย function

```js
// class
class BoldParagraph extends Component {
  render() {
    return (
      <p><strong>{this.props.children}</strong></p>
    )
  }
}

// stateless
// arrow function แบบละคำสั่ง return และ {..}
const BoldParagraph = (props) => <p><strong>{props.children}</strong></p>

// หรือแบบเต็ม
const BoldParagraph = (props) => {
  return <p><strong>{props.children}</strong></p>
}
```

### Challenge

ลองดูโค้ดใน Nav และ Footer แล้วลองคิดว่าจะเขียน Component อะไรต่อได้อีกเพื่อสามารถนำไป reuse ในอนาคต
