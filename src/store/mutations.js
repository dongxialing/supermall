export default {
  addCount(state, oldInfo) {
    oldInfo.count += 1
  },
  addNewCart(state, info) {
    state.cartList.push(info);
  }
}

