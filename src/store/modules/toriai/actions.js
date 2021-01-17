import ToriaiRepository from "@/repositories/ToriaiRepository";

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
  async saveOrder({commit}, payload) {
    try {
      let order = await ToriaiRepository.create(payload);
      if (order.status === 200) {
        return order;
      }
    } catch (error) {
      console.log(error);
    }
  },
  async exeAlgorithm({commit}, payload) {
    let objError = {
      status: 500,
      message: "Error"
    };
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
}
