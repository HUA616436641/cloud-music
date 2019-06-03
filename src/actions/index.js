// let nextTodoId = 0
// export const addTodo = text => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })

// export const setVisibilityFilter = filter => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// })

// export const toggleTodo = id => ({
//   type: 'TOGGLE_TODO',
//   id
// })
import { home } from "@/api"

export const getSongDetail = id => async (dispatch, getState) => {
  const getSongUrl = () => home.getSongUrl({ id })
  const getSongDetail = () => home.getSongDetail({ ids: id })
  // let res1 = await getSongUrl()
  // let res2 = await getSongDetail()
  let res = await Promise.all([getSongUrl(), getSongDetail()])
  console.log(res)
  let song = {
    songUrl: res[0].data[0].url,
    duration: res[1].songs[0].dt,
    cover: res[1].songs[0].al.picUrl
  }
  // home.getSongDetail({ ids: id }).then(res => {
  //   let song = {
  //     duration: res.songs[0].dt,
  //     cover: res.songs[0].al.picUrl
  //   }
    return dispatch(startPlay(song))
  // })
}

export const startPlay = song => ({
  type: "START",
  song
})

export const updatePlaylist = playlist => ({
  type: "UPDATE_PLAY_LIST",
  playlist
})
export const playNext = () => ({
  type: "PLAY_NEXT"
})
export const playPrev = () => ({
  type: "PLAY_PREV"
})
export const playContinue = () => ({
  type: "PLAY_CONTINUE"
})
export const playPause = () => ({
  type: "PLAY_PAUSE"
})
export const togglePlayStatus = playing => ({
  type: "TOGGLE_PLAY_STATUS",
  playing
})
