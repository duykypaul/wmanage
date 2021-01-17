export default {
  toriais: state => {
    if (state.toriais) {
      try {
        return state.toriais
      } catch (e) {
        console.error(e)
      }
    }
  },
  newToriai: state => {
    if (state.newToriai) {
      try {
        return state.newToriai
      } catch (e) {
        console.error(e)
      }
    }
  },
}
