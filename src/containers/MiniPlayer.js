import { connect } from 'react-redux'
import { playNext, playPrev, togglePlayStatus } from "../actions"
import MiniPlayer from '../components/MiniPlayer'

const mapStateToProps = state => ({
  playDetail: state.play,
  playlist: state.playlist
})

const mapDispatchToProps = dispatch => ({
  togglePlayStatus: playing => dispatch(togglePlayStatus(playing)),
  onPlayNext: () => dispatch(playNext()),
  onPlayPrev: () => dispatch(playPrev())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniPlayer)
