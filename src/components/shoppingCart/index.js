import React from 'react';
import useOrders from '../../contexts/orders';

function ShoppingCart() {
  
  const { cart } = useOrders();

  const cartlist = cart.map((i, index) => {
    return (
      <tr key={index}>
        <td>{i.id}</td>
        <td>{i.name}</td>
        <td>{'x' + i.count}</td>
    <td>{<Removebutton item={i} />} </td>
      </tr>
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
  const state = useOrders();
  return (
    <button onClick={() => state.removeItem(state.cart.indexOf(props.item))}>
      remove
    </button>
  )
}

export default ShoppingCart;