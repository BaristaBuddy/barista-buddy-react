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
      orderId: JSON.parse(window.localStorage.getItem('orderId')) || null,
      cart: JSON.parse(window.localStorage.getItem('cart')) || [],
      currentStore: JSON.parse(window.localStorage.getItem('currentStore')) || null,
      cartCount: JSON.parse(window.localStorage.getItem('cart')) ? JSON.parse(window.localStorage.getItem('cart')).length : 0,
      apiUrl: 'https://baristabuddyapi.azurewebsites.net/api/',
      user: props.user,
      //Context Methods
      addNew: this.addNew,
      removeItem: this.removeItem,
      Reset: this.Reset,
      //API METHODS
      CreateOrder: this.CreateOrder,
      CreateItem: this.CreateItem,
      UpdateItemQuantity: this.UpdateItemQuantity,
      GetTotalPrice: this.GetTotalPrice,
      DeleteItem: this.DeleteItem,
      
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
    };
    const response = await fetch(itemUrl, requestItem);
    const responseJSON = await response.json();
    const orderId = responseJSON.id;
    window.localStorage.setItem("orderId", JSON.stringify(orderId));
    return orderId;
  }
  UpdateItemQuantity = async (item) => {
    console.log("updating quantity!");
    const updateItemUrl = `${this.state.apiUrl}order/item/${parseInt(item.orderItemId)}`;
    const updatedItem = {
      Id: item.orderItemId,
      orderId: this.state.orderId,
      itemId: item.id,
      quantity: item.count,
    };
    let requestUpdate = {
      method: 'put',
      body: JSON.stringify(updatedItem),
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(updateItemUrl, requestUpdate);
    return (response ? "Item Updated" : "Update Failed");
  }

  DeleteItem = async (item) =>{
    console.log("Deleting item!");
    const deleteUrl = `${this.state.apiUrl}order/item/${parseInt(item.orderItemId)}`;
    const response = await fetch(deleteUrl);
    const responseJSON = await response.json();
    return (responseJSON.id !== null ? "Item Deleted!" : "Delete Failed!");
  }

  Reset = async () =>{
   await this.setState({orderId: null, currentStore: null,  cart: [], cartCount: 0 });
   window.localStorage.removeItem('cart');
   window.localStorage.removeItem('currentStore');
   window.localStorage.removeItem('orderId');
  }

  addNew = async (item) => {
    if (this.state.cart == null || this.state.cart.length <= 0) {
      window.localStorage.setItem("cart", JSON.stringify([]));
      await this.state.CreateOrder(item.storeId)
    };
    let newList = this.state.cart;
    //console.log(item);
    const newItem = {
      count: 1,
      id: item.itemId,
      name: item.name,
      price: item.price,
    }

    const filtered = newList.filter(i => {
      return i.id === item.itemId;
    });

    if (filtered.length > 0) {
      const pos = newList.map(i => { return i.id; }).indexOf(item.itemId);
      newList[pos].count += 1;
      window.localStorage.setItem("cart", JSON.stringify(this.state.cart));
      const message = await this.state.UpdateItemQuantity(newList[pos]);
      console.log(message);
    } else {
      const orderItemId =  await this.CreateItem(item);
      newItem.orderItemId = orderItemId;
      newList.push(newItem);
      window.localStorage.setItem("cart", JSON.stringify(newList));
      window.localStorage.setItem('currentStore', JSON.stringify(item.storeId));
      await this.setState({ currentStore: item.storeId });
    }

    this.setState({ ...this.state, cart: newList, cartCount: this.getCartCount() });
  }

  removeItem = async (index) => {
    const cartList = this.state.cart;
    const item = this.state.cart[index];
    const message = await this.state.DeleteItem(item);
    console.log(message);
    if(cartList[index].count === 1){
    cartList.splice(index, 1);
    } else {
      cartList[index].count--; 
    }

    if(cartList.length === 0) {
     await  this.state.Reset();
      console.log("Removing Order!");
    } else {
      await this.setState({ ...this.state, cart: cartList, cartCount: this.getCartCount() });
    }
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