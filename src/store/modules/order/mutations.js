export default {
  SET_ORDERS (state, orders) {
    state.materials = orders;
  },
  SET_NEW_ORDERS (state, newOrders) {
    state.newOrders = newOrders;
  },
  SET_LIST_CONSIGNMENT (state, list) {
    state.listConsignment = list;
  }
}
