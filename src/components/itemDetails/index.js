import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/fetch';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './itemDetails.scss';


export default function ItemDetails(props) {
  console.log(props);

  const { storeId, itemId } = useParams();
  const { request, response } = useFetch();
  const [itemDetails, setItemDetails] = useState([]);
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

  return (
    <div className="details-wrapper">
    <Modal.Dialog
    {...props}
    size="lg"
    aria-labelledby={itemDetails.name}
    centered
    >
      <form >
        <Modal.Header closeButton>
          <Modal.Title>
            Item Details
        </Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
          {console.log(itemDetails)}
          <p>{formatter.format(itemDetails.price)}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary">Close
          </Button>
          <Button variant="primary">
            Add to Cart
          </Button>
        </Modal.Footer>
      </form>
    </Modal.Dialog>
    </div>
  )
}