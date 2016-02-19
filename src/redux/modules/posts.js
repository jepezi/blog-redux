import superfetch from '../../lib/superfetch';
import handleActions from '../../lib/redux-actions/handleActions';
import { Schema, arrayOf } from 'normalizr';

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
  }
}, initialState)

//
const postSchema = new Schema('posts');

export function getPosts() {
  return (dispatch, getState) => {
    const posts = getState().posts;
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
