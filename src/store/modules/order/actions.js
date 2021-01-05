import OrderRepository from "@/repositories/OrderRepository";

export default {
  async getOrders({commit}) {
    try {
      let materials = await OrderRepository.findAll();
      if (materials.status === 200) {
        commit('SET_ORDERS', materials.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async saveOrder({commit}, payload) {
    try {
      let order = await OrderRepository.create(payload);
      if (order.status === 200) {
        return order;
      }
    } catch (error) {
      console.log(error);
    }
  },
  setListConsignment({commit}, data) {
    let listSource = [];
    for (let consignment of data) {
      if (consignment && consignment.length > 0) {
        for (let detail of consignment) {
          let itemConsignment = {
            materialTypeBean: {
              materialType: consignment[0].type.key,
              materialTypeName: consignment[0].type.value,
              dimension: consignment[0].dimension.key
            },
            consignmentNo: consignment[0].type.key + consignment[0].dimension.key,
            length: detail.length,
            quantity: detail.quantity,
          };
          listSource.push(itemConsignment);
        }
      }
    }
    commit('SET_LIST_CONSIGNMENT', listSource);
  }
}
