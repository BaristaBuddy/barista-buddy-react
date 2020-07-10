import React, {useState} from 'react';
import useOrders from '../../contexts/orders';
import { useHistory } from "react-router-dom";
import './shoppingCart.scss';

function ShoppingCart() {

  const { cart, removeItem, Reset, GetTotalPrice } = useOrders();
  const [checkedOut, setCheckedOut] = useState(false);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  let history = useHistory();
  function checkout(){
    setCheckedOut(!checkedOut);
    Reset();
  }

  const cartlist = cart.map((i, index) => {
    return (
      <>
        <tr key={index}>
          {/* <td>{i.id}</td> */}
          <td>`{i.name}  `</td>
          <td>{'x' + i.count}</td>
          <td>{formatter.format(i.price * i.count)}</td>
          <td>
            <div className="btn btn-primary">
              {<Removebutton item={index} text="Remove Item" func={removeItem} />}
            </div>
          </td>
        </tr>
      </>
    )
  })

  if (cart.length > 0) {
    return (
      <div style={
        { padding: '15px' }
      }>
        <h2>Your Cart</h2>

        <table className='c'>
          <tr className='thead'>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {cartlist}
        </table>
        <div className="btn btn-primary">
          <Removebutton text="Delete Order" func={Reset} />
        </div>
        <div className="checkout-wrapper">
          <h3>Total Price: {formatter.format(GetTotalPrice())}</h3>
          <div className="btn btn-primary">
            <Removebutton text="Go Back" func={history.goBack} />
          </div>
          <div className="btn btn-primary">
            <Removebutton text="Checkout" func={checkout} />
          </div>
        </div>
      </div>
    )

  } else {
    return (
      <>
        <h2>Your Cart</h2>
        <p className='c p'>{(checkedOut ? "Thank you For Your Order!" : "Cart is empty")}</p>
        <div className="btn btn-primary">
          <Removebutton className="btn btn-primary" text="Go Back" func={history.goBack} />
        </div>
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