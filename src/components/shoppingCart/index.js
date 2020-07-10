import React from 'react';
import useOrders from '../../contexts/orders';
import { useHistory } from "react-router-dom";

function ShoppingCart() {

  const { cart, removeItem, Reset, GetTotalPrice } = useOrders();
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  let history = useHistory();

  const cartlist = cart.map((i, index) => {
    return (
      <>
        <h2>Your Cart</h2>
        <tr key={index}>
          <td>{i.id}</td>
          <td>`{i.name}  `</td>
          <td>{'x' + i.count}</td>
          <td>{formatter.format(i.price * i.count)}</td>
          <td>{<Removebutton item={index} text="Remove Item" func={removeItem} />} </td>
        </tr>
      </>
    )
  })

  if (cart.length > 0) {
    return (
      <div style={
        { padding: '15px' }
      }>
        <table className='c'>
          <tr className='thead'>
            <th>ID</th>
            <th>NAME</th>
            <th>QUANTITY</th>
            <th>ACTIONS</th>
          </tr>
          {cartlist}
        </table>
        <Removebutton text="Delete Order" func={Reset} />
        <h3>Total Price: {formatter.format(GetTotalPrice())}</h3>
        <Removebutton text="Go Back" func={history.goBack} />
        <Removebutton text="Checkout" func={Reset} />
      </div>
    )

  } else {
    return (
      <>
        <p className='c'>cart is empty</p>
        <Removebutton text="Go Back" func={history.goBack} />
      </>
    )
  }
}

function Removebutton(props) {
  if (props.item !== null) {
    return (
      <button onClick={() => props.func(props.item)}>
        {props.text}
      </button>
    )
  } else {
    return (
      <button onClick={() => props.func()}>
        {props.text}
      </button>
    )
  }
}

export default ShoppingCart;