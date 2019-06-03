import { connect } from 'react-redux'
import { startPlay, updatePlaylist } from '../actions'
import Playlist from '../components/Playlist'

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
