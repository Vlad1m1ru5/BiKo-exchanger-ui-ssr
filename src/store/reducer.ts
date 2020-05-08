import { Reducer } from 'redux'
import actions from './actions'

type Actions = ActionCombine<typeof actions>

const initialState: Store = {
  token: '',
  isOpenMenu: false,
  isOpenFileEditor: false,
  openFileId: '',
  openFileOption: '',
  userName: '',
  userPassword: ''
};

const reducer: Reducer<Store, Actions> = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_AUTHORITY':
      return {
        ...state,
        token: payload
      }
    case 'SET_OPEN_FILE_ID':
      return {
        ...state,
        openFileId: payload
      }
    case 'SET_OPEN_FILE_OPTION':
      return {
        ...state,
        openFileOption: payload
      }
    case 'SET_IS_OPEN_MENU':
      return {
        ...state,
        isOpenMenu: payload
      }
    case 'SET_IS_OPEN_FILE_EDITOR':
      return {
        ...state,
        isOpenFileEditor: payload
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