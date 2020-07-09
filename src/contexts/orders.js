import React, { useContext } from 'react';
import AuthContext from '../contexts/auth';


// const ordersAPI = 'https://baristabuddyapi.azurewebsites.net/api/orders/';

export const OrdersContext = React.createContext();

export default function useOrders() {
  return useContext(OrdersContext);
}

export class OrdersProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderId: null,
      cart: [],
      currentStore: null,
      cartCount: 0,
      url: 'https://localhost:5001/api/orders/',
      user: AuthContext,

      addNew: this.addNew,
      removeItem: this.removeItem,
      CreateOrder: this.CreateOrder,
    };
  }


  CreateOrder = async (storeId) => {
    let data = {
      storeId: storeId,
    }
    let request = {
      url: this.state.url,
      options: {
        method: "post", 
        body: JSON.stringify(data),
        header: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.state.user.token}` }
      }
    }
    await fetch(request);
  }

  addNew = (item) => {

    if (this.state.cart == null) this.state.CreateOrder(item.storeId);
    let newList = this.state.cart;

    const newItem = {
      count: 1,
      id: item.id,
      name: item.name,
    }

    const filtered = newList.filter(i => {
      return i.id === item.id;
    });

    if (filtered.length > 0) {
      const pos = newList.map(i => { return i.id; }).indexOf(item.id);
      newList[pos].count += 1;
    } else {
      newList.push(newItem);
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
        count += item.count;
      });
    }

    return count;
  }

  render() {
    return (
      <OrdersContext.Provider value={this.state}>
        {this.props.children};
      </OrdersContext.Provider>
    )
  }
}