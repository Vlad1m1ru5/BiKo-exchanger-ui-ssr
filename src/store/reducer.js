import { SET_USER_NAME } from './actionTypeList';

const initialState = {
  userName: null
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_NAME:
      return {
        ...state,
        userName: payload
      };
    default:
      return state;
  }
};

export default reducer;