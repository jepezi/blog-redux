import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';

class App extends Component {
  render() {
    return <div>
      <Nav />

      <Home />

      <hr />

      <Footer />
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
