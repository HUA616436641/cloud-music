export const updatePlaylist = list => ({
  type: "UPDATE_PLAYLIST",
  list
})
export const clearPlaylist = () => ({
  type: "CLEAR_PLAYLIST"
})
export const deletePlaylist = id => ({
  type: "DELETE_PLAYLIST",
  id
})
