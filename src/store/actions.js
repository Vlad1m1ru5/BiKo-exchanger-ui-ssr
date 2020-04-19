import { SET_USER_NAME } from "./actionTypeList";

const createAction = (type, payload) => ({ type, payload });

const setUserName = (userName) => createAction(SET_USER_NAME, userName);

export default {
  setUserName
};