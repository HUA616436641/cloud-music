import { connect } from "react-redux"
import { playNext, playPrev, togglePlay, timeUpdate } from "../actions"
import MiniPlayer from "../components/MiniPlayer"

const mapStateToProps = state => ({
  playDetail: state.play,
  playlist: state.playlist
})

const mapDispatchToProps = dispatch => ({
  togglePlay: playing => dispatch(togglePlay(playing)),
  onTimeUpdate: () => {
    dispatch(timeUpdate())
  },
  onPlayNext: () => dispatch(playNext()),
  onPlayPrev: () => dispatch(playPrev())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniPlayer)
