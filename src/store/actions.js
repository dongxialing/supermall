export default {

    addCart(contex,info) {
      return new Promise((resole, reject) => {
        //查看之前是否添加
        const oldInfo = contex.state.cartList.find(item => item.iid === info.iid)
        if (oldInfo) {
          resole('当前数量+1')
          contex.commit('addCount', oldInfo)
        } else {
          info.count = 1;
          info.checked = true;
          resole('已加入购物车');
          contex.commit('addNewCart', info);
        }
      })
    }

}

