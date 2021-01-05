import MaterialTypeRepository from "@/repositories/MaterialTypeRepository";
export default {
  async getDimensions ({commit}) {
    try {
      let dimensions = await MaterialTypeRepository.findDistinctDimension();
      if (dimensions.status === 200) {
        commit('SET_DIMENSIONS', dimensions.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getTypes ({commit}) {
    try {
      let types = await MaterialTypeRepository.findDistinctByMaterialTypeAndAndMaterialTypeName();
      if (types.status === 200) {
        commit('SET_TYPES', types.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
}
