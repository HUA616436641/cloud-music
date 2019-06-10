export const cache = (state = {}, action) => {
  let { type, cache } = action
  switch (type) {
    case "UPDATE_CACHE":
      return {
        ...state,
        ...cache
      }
    default:
      return state
  }
}

export default cache
