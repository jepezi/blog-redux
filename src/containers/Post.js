import React, { Component, PropTypes } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import fetchData from '../lib/fetchData';
import { getPosts } from '../redux/modules/posts';

class Post extends Component {
  render() {
    const post = this.props.post;
    if (! post) return <div>Loading...</div>

    return <div>
      <Header
        bgStyle={{backgroundImage: "url('/img/post-bg.jpg')"}}
        headerClass='post-heading'
      >
        <h1>{post.title}</h1>
        <span className="meta">Posted by <a href="#">Start Bootstrap</a> on August 24, 2014</span>
      </Header>

      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            {post.body}

          </div>
        </div>
      </div>
    </div>;
  }
}

function mapState(state, props) {
  return {
    counter: state.counter,
    post: state.entities.posts && state.entities.posts[props.params.id]
  }
}

const Connected = connect(mapState)(Post);

const Fetched = fetchData(function prepareData(store) {
  return store.dispatch(getPosts())
})(Connected);

export default Fetched
