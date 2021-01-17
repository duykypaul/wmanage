import ToriaiRepository from "@/repositories/ToriaiRepository";
let objError = {
  status: 500,
  message: "Error"
};
export default {
  async getToriais({commit}) {
    try {
      let toriais = await ToriaiRepository.findAll();
      if (toriais.status === 200) {
        commit('SET_ORDERS', toriais.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getNewToriaiHeadNo({commit}, payload) {
    try {
      let no = await ToriaiRepository.getNewToriaiHeadNo(payload);
      if (no.status === 200) {
        return no.data
      }
      return objError
    } catch (error) {
      console.log(error);
    }
    return objError
  },
  async exeAlgorithm({commit}, payload) {
    try {
      let toriaiHead = await ToriaiRepository.exeAlgorithm(payload);
      console.log("toriaiHead: ", toriaiHead);
      if (toriaiHead.status === 200) {
        return toriaiHead.data;
      } else {
        return objError
      }
    } catch (error) {
      console.log(error);
      return objError;
    }
  },
  async saveToriai({commit}, payload) {
    try {
      let order = await ToriaiRepository.create(payload);
      if (order.status === 200) {
        return order;
      }
    } catch (error) {
      console.log(error);
    }
  },
}
