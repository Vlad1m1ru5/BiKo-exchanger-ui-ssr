import { createStore } from 'redux'
import reducer from './reducer';

export const configureStore = (prevState) => {
  const store = createStore(reducer, prevState)
  return store
}

export const createAppStore = () => createStore(reducer)