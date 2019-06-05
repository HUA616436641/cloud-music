export const playlist = (state = [], action) => {
  let { type, list } = action
  switch (type) {
    case "UPDATE":
      return [...list]
    default:
      return state
  }
}

export default playlist
