import { Reducer } from 'redux'
import actions from './actions'

type Actions = ActionCombine<typeof actions>

const initialState: Store = {
  path: '/',
  userName: '',
  userPassword: ''
};

const reducer: Reducer<Store, Actions> = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_PATH':
      return {
        ...state,
        path: payload
      }
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: payload
      }
    case 'SET_USER_PASSWORD':
      return {
        ...state,
        userPassword: payload
      }
    default:
      return state
  }
};

export default reducer;