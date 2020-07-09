import React, { useContext } from 'react';
import { AuthContext } from './auth'



// const ordersAPI = 'https://baristabuddyapi.azurewebsites.net/api/orders/';

export const OrdersContext = React.createContext();


export default function useOrders() {
  return useContext(OrdersContext);
}

export class OrdersProvider extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      orderId: null,
      cart: [],
      currentStore: null,
      cartCount: 0,
      apiUrl: 'https://baristabuddyapi.azurewebsites.net/api/',
      user: props.user,

      addNew: this.addNew,
      removeItem: this.removeItem,
      CreateOrder: this.CreateOrder,
      CreateItem: this.CreateItem,
      GetTotalPrice: this.GetTotalPrice,
    };
  }




  CreateOrder = async (storeId) => {
    console.log("creating new order!");
    let data = {
      storeId: storeId,
    }
    const orderUrl = `${this.state.apiUrl}orders/`
    let requestOrder = {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.context.token}` }
    }

    //console.log(requestOrder);
    const response = await fetch(orderUrl, requestOrder);
    const responseJSON = await response.json();
    const orderId = responseJSON.id;
    this.setState({ orderId });
  }

  CreateItem = async (item) => {
    console.log("creating new item!");
    const itemUrl = `${this.state.apiUrl}order/item/`
    const newOrderItem = {
      orderId: this.state.orderId,
      itemId: item.itemId,
      quantity: 1,
    }
    //console.log(newOrderItem);
    let requestItem = {
      method: 'post',
      body: JSON.stringify(newOrderItem),
      headers: { 'Content-Type': 'application/json' }
    }
    await fetch(itemUrl, requestItem);
  }

  addNew = async (item) => {
    if (this.state.cart == null || this.state.cart.length <= 0) {
      await this.state.CreateOrder(item.storeId)
    };
    let newList = this.state.cart;
    console.log(item);
    const newItem = {
      count: 1,
      id: item.id,
      name: item.name,
      price: item.price,
    }

    const filtered = newList.filter(i => {
      return i.id === item.id;
    });

    if (filtered.length > 0) {
      const pos = newList.map(i => { return i.id; }).indexOf(item.id);
      newList[pos].count += 1;
    } else {
      newList.push(newItem);
      this.setState({ currentStore: item.storeId });
      this.CreateItem(item);
    }

    this.setState({ ...this.state, cart: newList, cartCount: this.getCartCount() });
  }

  removeItem = (index) => {
    const cartList = this.state.cart;

    cartList.splice(index, 1);

    this.setState({ ...this.state, cart: cartList, cartCount: this.getCartCount() });
  }

  getCartCount = () => {
    let count = 0;

    if (this.state.cart.length > 0) {

      this.state.cart.forEach(item => {
        count += parseInt(item.count);
      });
    }

    return count;
  }
  GetTotalPrice = () => {
    let sum = 0;
    this.state.cart.forEach(item => {
      sum += item.price * item.count;
    });
    return sum;
  }

  render() {
    return (
      <OrdersContext.Provider value={this.state}>
        {this.props.children};
      </OrdersContext.Provider>
    )
  }
}