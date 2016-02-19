import superfetch from '../../../lib/superfetch';
import handleActions from '../../../lib/redux-actions/handleActions';
import { Schema, arrayOf } from 'normalizr';
import union from 'lodash/union';

const initialState = {
  isLoading: false,
  ids: []
};

export default handleActions({
  'posts/get': {
    start: state => ({ ...state, isLoading: true }),
    next: (state, action) => {
      return {
        ...state,
        ids: action.payload.result,
        isLoading: false
      }
    }
  },
  'post/get': {
    start: (state) => {
      return { ...state, isLoading: true };
    },
    next: (state, action) => {
      return {
        ...state,
        ids: union([], state.ids, [action.payload.result]),
        isLoading: false
      };
    }
  },
  'post/update': {
    start: (state) => {
      return { ...state, isLoading: true };
    },
    next: (state, action) => {
      return {
        ...state,
        isLoading: false
      };
    }
  },
  'post/create': {
    start: (state) => {
      return { ...state, isLoading: true };
    },
    next: (state, action) => {
      return {
        ...state,
        ids: union([], [action.payload.result], state.ids),
        isLoading: false
      };
    }
  }
}, initialState)

//
const postSchema = new Schema('posts');
const commentSchema = new Schema('comments');

postSchema.define({
  comments: arrayOf(commentSchema),
});

//
export function getPosts() {
  return (dispatch, getState) => {
    const posts = getState().posts.ids;
    if (posts.length > 1) return;

    return dispatch({
      type: 'posts/get',
      payload: superfetch('http://localhost:9001/api/v1/posts'),
      meta: {
        schema: arrayOf(postSchema)
      }
    });
  }
}

//
export function getPost(postId) {
  return (dispatch, getState) => {
    const currentState = getState().posts.ids.filter(id => +id === +postId);
    if (currentState.length) {
      return;
    }

    return dispatch({
      type: 'post/get',
      payload: superfetch('http://localhost:9001/api/v1/posts/' + postId),
      meta: {
        schema: postSchema
      },
    })
  }
}

//
export function updatePost(postId, payload) {
  return (dispatch, getState) => {
    // validate

    return dispatch({
      type: 'post/update',
      payload: superfetch('http://localhost:9001/api/v1/posts/' + postId, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }),
      meta: {
        schema: postSchema
      },
    })
  }
}

//
export function createPost(payload) {
  return (dispatch, getState) => {
    // validate

    return dispatch({
      type: 'post/create',
      payload: superfetch('http://localhost:9001/api/v1/posts/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }),
      meta: {
        schema: postSchema
      },
    })
  }
}
