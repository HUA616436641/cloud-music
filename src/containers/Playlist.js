import { connect } from "react-redux"
import actions from "../actions"
import Playlist from "../components/Playlist"

let { updatePlaylist } = actions
const mapStateToProps = state => ({
  // currentPlay: state.currentPlay,
  // playList: state.playList
})

const mapDispatchToProps = dispatch => ({
  onPlay: (song, playlist) => {
    dispatch(updatePlaylist(playlist))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist)
