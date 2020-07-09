import React from 'react';
import useOrders from '../../contexts/orders';

function ShoppingCart() {
  
  const { cart, removeItem, Reset } = useOrders();

  const cartlist = cart.map((i, index) => {
    return (
      <>
      <h2>Your Cart</h2>
      <tr key={index}>
        <td>{i.id}</td>
        <td>{i.name}</td>
        <td>{'x' + i.count}</td>
    <td>{<Removebutton item={i} text="Remove Item" func={removeItem} cart={cart} />} </td>
      </tr>
      </>
    )
  })

  if (cart.length > 0) {
    return (
      <div style={
        {padding:'15px'}
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
      </div>
    )

  } else {
    return <p className='c'>cart is empty</p>
  }
}

function Removebutton(props) {
  const cart = props.cart;
  return (
    <button onClick={() => props.func(cart.indexOf(props.item))}>
      {props.text}
    </button>
  )
}

export default ShoppingCart;