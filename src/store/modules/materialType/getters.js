export default {
  dimensions: state => {
    if (state.dimensions) {
      try {
        return state.dimensions
      } catch (e) {
        console.error(e)
      }
    }
  },
  types: state => {
    if (state.types) {
      try {
        return state.types
      } catch (e) {
        console.error(e)
      }
    }
  }
}
