import * as play from "./play"
import * as playlist from "./playlist"
import * as cache from "./cache"
export default {
  ...cache,
  ...play,
  ...playlist
}
