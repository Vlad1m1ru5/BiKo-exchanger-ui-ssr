const createAction: ActionCreator = <T extends string, P>(type: T, payload: P) => (
  payload === undefined ? { type } : { type, payload }
)

const setPath = (path: string) => createAction('SET_PATH', path)

const setUserName = (userName: string) => createAction('SET_USER_NAME', userName);

const setUserPassword = (userPassword: string) => createAction('SET_USER_PASSWORD', userPassword)

export default {
  setPath,
  setUserName,
  setUserPassword
};