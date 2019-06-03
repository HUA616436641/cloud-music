import { connect } from "react-redux"
import {
  getSongDetail,
  playNext,
  playPrev,
  playPause,
  playContinue
} from "../actions"
import Play from "../components/Play"

const mapStateToProps = state => {
  return {
    playDetail: state.play
  }
}

const mapDispatchToProps = dispatch => ({
  getSongDetail: id => {
    return dispatch(getSongDetail(id))
  },
  onPlayPrev: () => dispatch(playNext()),
  onPlayNext: () => dispatch(playPrev()),
  onPlayPause: () => dispatch(playPause()),
  onPlayContinue: () => dispatch(playContinue())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play)
