import { Reducer } from 'redux'
import actions from './actions'

type Actions = ActionCombine<typeof actions>

const initialState: Store = {
  authority: '',
  isOpenMenu: false,
  userName: '',
  userPassword: ''
};

const reducer: Reducer<Store, Actions> = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_AUTHORITY':
      return {
        ...state,
        authority: payload
      }
      case 'SET_IS_OPEN_MENU':
        return {
          ...state,
          isOpenMenu: !state.isOpenMenu
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