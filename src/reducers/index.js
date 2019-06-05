import { combineReducers } from 'redux'
import play from "./play"
import playlist from "./playlist"

export default combineReducers({
  play,
  playlist
})
