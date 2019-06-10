import { home } from "@/api"

export const getSongDetail = id => async dispatch => {
  const getSongUrl = () => home.getSongUrl({ id })
  const getSongDetail = () => home.getSongDetail({ ids: id })
  let res = await Promise.all([getSongUrl(), getSongDetail()])
  let song = {
    id,
    songUrl: res[0].data[0].url,
    name: res[1].songs[0].name,
    duration: res[1].songs[0].dt,
    author: res[1].songs[0].ar,
    cover: res[1].songs[0].al.picUrl
  }
  return dispatch(startPlay(song))
}

export const startPlay = song => ({
  type: "START",
  song
})

export const stopPlay = () => ({
  type: "STOP"
})

export const updatePlaylist = playlist => ({
  type: "UPDATE_PLAY_LIST",
  playlist
})

export const playNext = () => (dispatch, getState) => {
  let { playlist, play } = getState()
  let idx = playlist.findIndex(v => v.id === play.id)
  if (idx >= 0) {
    let id = playlist[idx === playlist.length - 1 ? 0 : idx + 1].id
    dispatch(getSongDetail(id))
  }
}
export const playPrev = () => (dispatch, getState) => {
  let { playlist, play } = getState()
  let idx = playlist.findIndex(v => v.id === play.id)
  if (idx >= 0) {
    let id = playlist[idx === 0 ? playlist.length - 1 : idx - 1].id
    dispatch(getSongDetail(id))
  }
}
export const playContinue = () => ({
  type: "CONTINUE"
})
export const playPause = () => ({
  type: "PAUSE"
})
export const togglePlay = playing => ({
  type: "TOGGLE_PLAY",
  playing
})
export const toggleMode = () => ({
  type: "TOGGLE_MODE"
})
export const timeUpdate = obj => ({
  type: "TIME_UPDATE",
  curTimeStamp: obj.curTimeStamp,
  playing: obj.playing
})
export const timeChange = timeStamp => ({
  type: "TIME_CHANGE",
  curTimeStamp: timeStamp
})
export const afterTimeChange = timeStamp => ({
  type: "AFTER_TIME_CHANGE",
  curTimeStamp: timeStamp
})
