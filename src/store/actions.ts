const createAction: ActionCreator = <T extends string, P>(type: T, payload: P) => (
  payload === undefined ? 
    { type } :
    { type, payload }
)

const setAuthority = (authority: string) => createAction('SET_AUTHORITY', authority)
const setIsOpenMenu = () => createAction('SET_IS_OPEN_MENU')
const setUserName = (userName: string) => createAction('SET_USER_NAME', userName);
const setUserPassword = (userPassword: string) => createAction('SET_USER_PASSWORD', userPassword)

export default {
  setAuthority,
  setIsOpenMenu,
  setUserName,
  setUserPassword
};