import { Reducer } from 'redux'
import actions from './actions'

type Actions = ActionCombine<typeof actions>

const initialState: Store = {
  userName: null
};

const reducer: Reducer<Store, Actions> = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER_NAME':
      return {
        ...state,
        userName: payload
      };
    default:
      return state;
  }
};

export default reducer;