import { connect } from "react-redux"
import actions from "../actions"
import Playlist from "../components/Playlist"

let { updatePlaylist, updateCache } = actions
const mapStateToProps = state => ({
  cache: state.cache
})

const mapDispatchToProps = dispatch => ({
  updatePlaylist: playlist => {
    dispatch(updatePlaylist(playlist))
  },
  updateCache: cache => dispatch(updateCache(cache))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist)
