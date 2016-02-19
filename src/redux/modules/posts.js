import superfetch from '../../lib/superfetch';

export default (state = [], action) => {
  switch (action.type) {
    case 'posts/get':
      if (action.sequence.type === 'next') {
        return [ ...state, ...action.payload ]
      }
    default:
      return state;
  }
}

export function getPosts() {
  return {
    type: 'posts/get',
    payload: superfetch('http://jsonplaceholder.typicode.com/posts'),
  };
}
