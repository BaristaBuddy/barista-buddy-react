import React, { useContext } from 'react';

const ordersAPI = 'https://baristabuddyapi.azurewebsites.net/api/orders/';

export const OrdersContext = React.createContext();

export default function useOrders() {
  return useContext(OrdersContext);
}

export class OrdersProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: {},
      currentStore: null,
    };
  }



  render() {
    return (
      <OrdersContext.Provider value={this.state}>
        {this.props.children};
      </OrdersContext.Provider>
    )
  }
}