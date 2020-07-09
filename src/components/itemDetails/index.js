import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/fetch';
import Modal from './../modal';
import Button from 'react-bootstrap/Button';
import './itemDetails.scss';
import useOrders from '../../contexts/orders';

export default function ItemDetails(props) {
  console.log(props);

  const { storeId, itemId } = useParams();
  const { request, response } = useFetch();
  const [itemDetails, setItemDetails] = useState([]);
  const { onClose } = props;
  const { addNew } = useOrders();

  const BBurl = `https://baristabuddyapi.azurewebsites.net/api/stores/${storeId}/Items/${itemId}`;

  const getItem = React.useCallback(() => {
    const requestbody = {
      url: BBurl,
      options: { method: "get" }
    }
    request(requestbody);
  }, [request, BBurl]);

  //useEffect for initial Load, Can add more dependencies as needed.
  useEffect(() => {
    getItem();

  }, [getItem]);

  useEffect(() => {
    setItemDetails(response);
  }, [response]);
  // useEffect(() => {
  //   if (response.length > 0) {
  //     console.log(response);


  //   } else {
  //     getItem();
  //   }
  // }, [response, getItem, setItemDetails]);

  //https://flaviocopes.com/how-to-format-number-as-currency-javascript/
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  function handleAdd() {
    addNew(itemDetails);
    onClose();
  }


  return (
    <div className="details-wrapper">
      <Modal title="Item Details" onClose={onClose}>
        <form >
          {/* <img src={itemDetails.imageUrl} alt={itemDetails.name} /> */}
          <h2>{itemDetails.name}</h2>
          <p>{itemDetails.ingredients}</p>
          {/* {itemDetails.itemModifiers.map((itemModifier) => (
            <label>
              {itemModifier.modifierName}
              <input type="checkbox" name="Modifier" value={itemModifier.modifierName} />
              {itemModifier.additionalCost}
            </label>
          ))} */}
          {console.log(itemDetails.itemModifiers)}
          <p>{formatter.format(itemDetails.price)}</p>
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            onClick={handleAdd}
          >
            Add To Cart
          </Button>
        </form>
      </Modal>
    </div>
  )
}

function Addbutton(props) {

  const { addNew } = useOrders();

  return (
    <button onClick={() => addNew(props.item)}>
      add to cart
    </button>
  )
}