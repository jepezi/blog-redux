import merge from 'lodash/merge';
import posts from './posts';

function greeting(state = [], action) {
  if (action.type === 'greeting') {
    return [ ...state, action.payload.name ];
  }

  return state;
}

function counter(state = 0, action) {
  if (action.type === 'counter') {
    return state + 1
  }

  return state;
}

function entities(state = {}, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities)
  }

  return state;
}

const reducers = (state = {}, action) => {
  return {
    greeting: greeting(state.greeting, action),
    counter: counter(state.counter, action),
    entities: entities(state.entities, action),
    posts: posts(state.posts, action)
  }
}

export default reducers;
