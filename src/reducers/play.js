let playInfo = {
  id: undefined,
  songUrl: "",
  cover: "",
  curTimeStamp: 0,
  duration: 0,
  playing: false,
  draging: false
}
export const play = (state = playInfo, action) => {
  let { type, ...rest } = action
  switch (type) {
    case "START":
      return {
        ...state,
        ...rest.song,
        playing: true
      }
    case "TOGGLE_PLAY_STATUS":
      return {
        ...state,
        ...rest
      }
    case "TIME_UPDATE":
      return {
        ...state,
        ...rest
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
