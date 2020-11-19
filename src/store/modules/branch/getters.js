export default {
  branches: state => {
    if (state.branches) {
      try {
        return state.branches
      } catch (e) {
        console.error(e)
      }
    }
  }
}
