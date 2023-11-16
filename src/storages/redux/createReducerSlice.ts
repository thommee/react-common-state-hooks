type AnyAction = { type: string; payload?: { key?: string; value?: unknown } };
type Action<T> = { type: string; payload: { key: string; value: T } };
type ReducerState = Record<string, unknown>;
export type RootState = Record<string, unknown>;

export const createReducerSlice = (name: string) => {
  const initialReducerState: ReducerState = {};
  const reducer = (state: ReducerState = initialReducerState, action: AnyAction) => {
    if (action?.type.indexOf(name + '/') === 0 && action?.payload?.key) {
      return { ...state, [action.payload.key]: action.payload.value };
    }
    return state;
  };

  const createAction = <T>(key: string) => {
    const type = `${name}/${key}/save`;
    const action = (value: T): Action<T> => ({ type, payload: { key, value } });
    action.match = (a: AnyAction) => a.type === type;
    return action;
  };

  const createSelector =
    <T, R extends RootState>(key: string, initialState: T) =>
    (rootState: R): T =>
      Object.prototype.hasOwnProperty.call(rootState[name] ?? {}, key)
        ? ((rootState[name] as ReducerState)?.[key] as T)
        : initialState;

  return { reducer, name, createAction, createSelector };
};
