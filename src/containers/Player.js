import { connect } from "react-redux"
import actions from "../actions"
import Player from "../components/Player"

let { playNext, playPrev, togglePlay, timeUpdate } = actions
export const onTimeUpdate = () => (dispatch, getState) => {
  let player = document.querySelector(".player")
  let curTimeStamp = player ? player.currentTime : 0
  let { duration } = getState().play
  let finished = Math.round(curTimeStamp) === Math.round(duration / 1000)
  dispatch(timeUpdate({ curTimeStamp, playing: !finished }))
  finished && dispatch(playNext())
}
const mapStateToProps = state => ({
  playDetail: state.play,
  playlist: state.playlist
})

const mapDispatchToProps = dispatch => ({
  togglePlay: playing => dispatch(togglePlay(playing)),
  onTimeUpdate: () => dispatch(onTimeUpdate()),
  onPlayNext: () => dispatch(playNext()),
  onPlayPrev: () => dispatch(playPrev())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
