import { connect } from 'react-redux'
import { playNext, playPrev  } from '../actions'
import TodoList from '../components/TodoList'

const mapStateToProps = state => ({
  currentPlay: state.currentPlay,
  playList: state.playList
})

const mapDispatchToProps = dispatch => ({
  playNext: () => dispatch(playNext()),
  playPrev: () => dispatch(playPrev())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
