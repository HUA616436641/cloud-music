import { connect } from 'react-redux'
import { playNext, playPrev, togglePlayStatus, timeUpdate } from "../actions"
import MiniPlayer from '../components/MiniPlayer'

const mapStateToProps = state => ({
  playDetail: state.play,
  playlist: state.playlist
})

const mapDispatchToProps = (dispatch, getState) => ({
  togglePlayStatus: playing => dispatch(togglePlayStatus(playing)),
  onTimeUpdate: () => {
    console.log(getState())
    !getState().play.draging && dispatch(timeUpdate())
  },
  onPlayNext: () => dispatch(playNext()),
  onPlayPrev: () => dispatch(playPrev())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniPlayer)
