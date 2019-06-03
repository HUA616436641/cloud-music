let playInfo = {
  id: undefined,
  songUrl: "",
  cover: "",
  curTimeStamp: 0,
  duration: 0,
  playing: false
}
export const play = (state = playInfo, action) => {
  let { type, ...rest } = action
  console.log(type)
  switch (type) {
    case "START":
      return {
        ...state,
        ...rest.song
      }
    case "TOGGLE_PLAY_STATUS":
      return {
        ...state,
        ...rest.playing
      }
    case "NEXT":
      return state
    case "PREV":
      return state
    case "PAUSE":
      return state
    case "CONTINUE":
      return state
    case "UPDATE_MODE":
      return state
    default:
      return state
  }
}

export default play
