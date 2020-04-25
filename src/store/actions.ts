const createAction: ActionCreator = <T extends string, P>(type: T, payload: P) => (
  payload === undefined ? { type } : { type, payload }
)

const setUserName = (userName: string) => createAction('SET_USER_NAME', userName);

export default {
  setUserName
};