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
    let objError = {
      status: 500,
      message: "Error"
    };
    try {
      let materials = await MaterialRepository.saveAllData(payload);
      console.log('materials: ', materials);
      if (materials.data && materials.status === 200) {
        return materials.data;
      } else {
        return objError
      }
    } catch (error) {
      console.log(error);
      return objError
    }
  }
}
