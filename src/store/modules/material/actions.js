import MaterialRepository from "@/repositories/MaterialRepository";

export default {
  async getMaterials({commit}) {
    try {
      let materials = await MaterialRepository.findAll();
      if (materials.status === 200) {
        commit('SET_MATERIALS', materials.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async saveAllMaterial({commit}, payload) {
    try {
      let materials = await MaterialRepository.saveAllData(payload);
      if (materials.status === 200) {
        return materials;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
