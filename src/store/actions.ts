const createAction: ActionCreator = <T extends string, P>(type: T, payload: P) => (
  payload === undefined ? { type } : { type, payload }
)

const setAuthority = (credentials: Credentials) => createAction('SET_AUTHORITY', 'user')
const setUserName = (userName: string) => createAction('SET_USER_NAME', userName);
const setUserPassword = (userPassword: string) => createAction('SET_USER_PASSWORD', userPassword)

export default {
  setAuthority,
  setUserName,
  setUserPassword
};