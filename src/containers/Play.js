import { connect } from "react-redux"
import actions from "../actions"
import Play from "../components/Play"
let {
  getSongDetail,
  playNext,
  playPrev,
  playPause,
  playContinue,
  toggleMode,
  togglePlay,
  timeChange,
  afterTimeChange
} = actions
const mapStateToProps = state => {
  return {
    playDetail: state.play
  }
}

const mapDispatchToProps = dispatch => ({
  getSongDetail: id => {
    return dispatch(getSongDetail(id))
  },
  onPlayPrev: () => dispatch(playPrev()),
  onPlayNext: () => dispatch(playNext()),
  onPlayPause: () => dispatch(playPause()),
  onPlayContinue: () => dispatch(playContinue()),
  onToggleMode: () => dispatch(toggleMode()),
  onTogglePlay: val => dispatch(togglePlay(val)),
  onTimeChange: timeStamp => dispatch(timeChange(timeStamp)),
  onAfterTimeChange: timeStamp => dispatch(afterTimeChange(timeStamp))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play)
