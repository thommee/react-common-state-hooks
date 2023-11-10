type AnyAction = { type: string; payload?: { key?: string; value?: unknown } };
type Action<T> = { type: string; payload: { key: string; value: T } };

export const createReducerSlice = (name: string) => {
  const initialReducerState = {};
  const reducer = (state = initialReducerState, action: AnyAction) => {
    if (action?.type.indexOf(name + '/') === 0 && action?.payload?.key) {
      return { ...state, [action.payload.key]: action.payload.value };
    }
    return state;
  };

  const createAction =
    <T>(key: string) =>
    (value: T): Action<T> => ({ type: `${name}/${key}/save`, payload: { key, value } });
  const createSelector =
    <T>(key: string, initialState: T) =>
    (rootState: any) =>
      Object.prototype.hasOwnProperty.call(rootState[name], key) ? rootState[name][key] : initialState;

  return { reducer, name, createAction, createSelector };
};
