import { combineReducers } from 'redux'
import cache from "./cache"
import play from "./play"
import playlist from "./playlist"

export default combineReducers({
  cache,
  play,
  playlist
})
