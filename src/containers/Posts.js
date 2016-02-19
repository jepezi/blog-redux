import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getPosts } from '../redux/modules/posts';

import fetchData from '../lib/fetchData';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true }
    this.toggle = this.toggle.bind(this);
  }

  renderPosts() {
    if (! this.props.posts.length) {
      return <div>Loading...</div>
    }

    return this.props.posts.slice(0, 10).map(post => {
      return (
        <div key={post.id}>
          <div className="post-preview">
            <Link to={`/posts/${post.id}`}>
              <h2 className="post-title">
                {post.title}
              </h2>
              <h3 className="post-subtitle">
                {post.body.split(' ', 20).join(' ') + '...'}
              </h3>
            </Link>
            <p className="post-meta">Posted by <a href="#">Start Bootstrap</a> on September 24, 2014</p>
          </div>
          <hr />
        </div>
      )
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <div>
      <Header bgStyle={{backgroundImage: "url('/img/post-bg.jpg')"}}>
        <h1>All Posts</h1>
        <hr className="small" />
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

function mapState(state) {
  return {
    counter: state.counter,
    posts: state.posts.ids.map(id => state.entities.posts[id])
  }
}

const Connected = connect(mapState)(Posts);

const Fetched = fetchData(function prepareData(store) {
  return store.dispatch(getPosts())
})(Connected);

export default Fetched
