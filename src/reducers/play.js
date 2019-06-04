let playInfo = {
  id: undefined,
  songUrl: "",
  cover: "",
  curTimeStamp: 0,
  duration: 0,
  playing: false,
  draging: false,
  mode: { name: "ORDER", icon: "danqu" }
}
const modes = [
  // 顺序播放
  { name: "ORDER", icon: "order" },
  // 单曲循环
  { name: "SINGLE_LOOP", icon: "danqu" },
  // 随机播放
  { name: "RANDOM", icon: "suiji" }
]
export const play = (state = playInfo, action) => {
  let { type, ...rest } = action
  switch (type) {
    case "START":
      return {
        ...state,
        ...rest.song,
        curTimeStamp: 0,
        draging: false,
        playing: true
      }
    case "TOGGLE_PLAY":
      return {
        ...state,
        ...rest
      }
    case "TIME_UPDATE":
      let finished = parseInt(rest.curTimeStamp * 1000) === state.duration
      return {
        ...state,
        ...rest,
        playing: !finished
      }
    case "TIME_CHANGE":
      return {
        ...state,
        ...rest,
        draging: true
      }
    case "AFTER_TIME_CHANGE":
      return {
        ...state,
        ...rest,
        draging: false
      }
    case "TOGGLE_MODE":
      let idx = modes.findIndex(v => v.name === state.mode.name)
      if (idx >= 0) {
        return {
          ...state,
          mode: modes[idx === modes.length - 1 ? 0 : idx + 1]
        }
      }
      return state
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
