import React, { useContext } from 'react';
import cookie from 'react-cookies';
import AuthContext from './auth'



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
      apiUrl: 'https://baristabuddyapi.azurewebsites.net/api/orders/',
      user: props.user,

      addNew: this.addNew,
      removeItem: this.removeItem,
      CreateOrder: this.CreateOrder,
      GetTotalPrice: this.GetTotalPrice,
    };
  }

  static contextType = AuthContext;


  CreateOrder = (storeId, user) => {
    let data = {
      storeId: storeId,
    }
    const cookieToken = cookie.load('auth');
    let requestOrder = {
      options: {
        method: 'post', 
        body: JSON.stringify(data),
        header: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookieToken}` }
      }
      
    }
    console.log(requestOrder);
    fetch(this.state.apiUrl, requestOrder.options).then(response =>{
      console.log(response);
    });
  }

  addNew = (item) => {

    if (this.state.cart == null || this.state.cart.length <= 0) {
      //this.state.CreateOrder(item.storeId)
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
      this.setState({currentStore: item.storeId});
    }

    this.setState({ ...this.state, cart: newList, cartCount: this.getCartCount() });
    console.log(this.GetTotalPrice())
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
  GetTotalPrice = () =>{
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