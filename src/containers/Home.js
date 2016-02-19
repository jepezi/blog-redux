import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true, data: null }
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    $.get('http://jsonplaceholder.typicode.com/posts', res => {
      this.setState({
        data: res.slice(0, 4)
      });
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderPosts() {
    if (! this.state.data) {
      return <div>Loading...</div>
    }

    return this.state.data.map(post => {
      return (
        <div key={post.id}>
          <div className="post-preview">
            <Link to={`/posts/${post.id}`}>
              <h2 className="post-title">
                {post.title}
              </h2>
              <h3 className="post-subtitle">
                {post.body}
              </h3>
            </Link>
            <p className="post-meta">Posted by <a href="#">Start Bootstrap</a> on September 24, 2014</p>
          </div>
          <hr />
        </div>
      )
    })
  }

  render() {
    return <div>
      <Header bgStyle={{backgroundImage: "url('/img/home-bg.jpg')"}}>
        <h1>Clean Blog</h1>
        <hr className="small" />
        <span className="subheading">A Clean Blog Theme by Start Bootstrap</span>
        <button onClick={this.toggle} className="btn btn-primary">Toggle</button>
      </Header>

      {this.state.isOpen && <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            {this.renderPosts()}
            <ul className="pager">
              <li className="next">
                <a href="#">Older Posts &rarr;</a>
              </li>
            </ul>
          </div>
        </div>
      </div>}
    </div>;
  }
}

export default Home;
