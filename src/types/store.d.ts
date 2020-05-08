interface Action<T extends string> {
  type: T
}

interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

interface ActionCreator {
  <T extends string>(type: T, payload?: undefined): Action<T>
  <T extends string, P>(type: T, payload: P): P extends undefined ? Action<T> : ActionWithPayload<T, P>
}

interface ActionCreators {
  [actionCreator: string]: (...args: any[]) => any
}

type ActionCombine<A extends ActionCreators> = ReturnType<A[keyof A]>

interface Store {
  token: string
  isOpenMenu: boolean
  isOpenFileEditor: boolean
  openFileId: string
  userName: string
  userPassword: string
}