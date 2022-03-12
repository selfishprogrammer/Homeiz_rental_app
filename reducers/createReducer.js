export default function createStore(initialState, handlers) {
  return (state = initialState, action = null) => {
    if (!action) {
      return {...state};
    }
    const changes = handlers[action.type]
      ? handlers[action.type](state, action)
      : {};

    return {...state, ...changes};
  };
}
