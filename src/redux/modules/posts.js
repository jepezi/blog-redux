import superfetch from '../../lib/superfetch';
import handleActions from '../../lib/redux-actions/handleActions';

const initialState = []

export default handleActions({
  'posts/get': {
    start: state => state,
    next: (state, action) => {
      return [ ...state, ...action.payload ]
    }
  }
}, initialState)

export function getPosts() {
  return (dispatch, getState) => {
    const posts = getState().posts;
    if (posts.length > 1) return;

    return dispatch({
      type: 'posts/get',
      payload: superfetch('http://jsonplaceholder.typicode.com/posts'),
    });
  }
}
