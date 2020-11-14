export default {
  materials: state => {
    if (state.materials) {
      try {
        return state.materials
      } catch (e) {
        console.error(e)
      }
    }
  }
}
