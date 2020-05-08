const createAction: ActionCreator = <T extends string, P>(type: T, payload: P) => (
  payload === undefined ? 
    { type } :
    { type, payload }
)

export const setToken = (token: string) => createAction('SET_AUTHORITY', token)
export const setOpenFileId = (id: string) => createAction('SET_OPEN_FILE_ID', id)
export const setIsOpenMenu = (isOpen: boolean) => createAction('SET_IS_OPEN_MENU', isOpen)
export const setIsOpenFileEditor = (isOpen: boolean) => createAction('SET_IS_OPEN_FILE_EDITOR', isOpen)
export const setUserName = (userName: string) => createAction('SET_USER_NAME', userName);
export const setUserPassword = (userPassword: string) => createAction('SET_USER_PASSWORD', userPassword)

export default {
  setToken,
  setOpenFileId,
  setIsOpenMenu,
  setIsOpenFileEditor,
  setUserName,
  setUserPassword
};