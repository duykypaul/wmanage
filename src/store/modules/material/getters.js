export default {
  materials: state => {
    if (state.materials) {
      try {
        return state.materials
      } catch (e) {
        console.error(e)
      }
    }
  },
  lstNewMaterial: state => {
    if (state.lstNewMaterial) {
      try {
        return state.lstNewMaterial
      } catch (e) {
        console.error(e)
      }
    }
  }
}
