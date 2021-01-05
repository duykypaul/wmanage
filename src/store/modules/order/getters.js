export default {
  orders: state => {
    if (state.orders) {
      try {
        return state.orders
      } catch (e) {
        console.error(e)
      }
    }
  },
  newOrders: state => {
    if (state.newOrders) {
      try {
        return state.newOrders
      } catch (e) {
        console.error(e)
      }
    }
  },
  listConsignment: state => {
    if (state.listConsignment) {
      try {
        return state.listConsignment
      } catch (e) {
        console.error(e)
      }
    }
  },

}
