export const playlist = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PLAYLIST":
      return action.list
    case "CLEAR_PLAYLIST":
      return []
    case "DELETE_PLAYLIST":
      let list = state.filter(v => v.id !== action.id)
      return list
    default:
      return state
  }
}

export default playlist
