const createAction: ActionCreator = <T extends string, P>(type: T, payload: P) => (
  payload === undefined ? 
    { type } :
    { type, payload }
)

export const setToken = (token: string) => createAction('SET_AUTHORITY', token)
export const setIsOpenMenu = () => createAction('SET_IS_OPEN_MENU')
export const setUserName = (userName: string) => createAction('SET_USER_NAME', userName);
export const setUserPassword = (userPassword: string) => createAction('SET_USER_PASSWORD', userPassword)

export default {
  setToken,
  setIsOpenMenu,
  setUserName,
  setUserPassword
};