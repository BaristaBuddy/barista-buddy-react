import React, { useEffect, useState, useContext } from 'react';
import useFetch from '../../hooks/fetch.js';
import { useParams, Link, Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import Modal from '../modal';
import useOrders from '../../contexts/orders';
import ItemDetails from './../itemDetails';

export default function Menu(props) {

  const { storeId } = useParams();
  const { request, response, error, isLoading } = useFetch();
  const [menu, setMenu] = useState([]);
  const BBurl = `https://baristabuddyapi.azurewebsites.net/api/stores/${storeId}/Items`;



  const getItems = React.useCallback(() => {
    const requestbody = {
      url: BBurl,
      options: { method: "get" }
    }
    request(requestbody);
  }, [request, BBurl]);

  //useEffect for initial Load, Can add more dependencies as needed.
  useEffect(() => {
    getItems();
  }, [getItems]);

  //setting storelist
  useEffect(() => {
    if (response.length > 0) {
      console.log(response);
      setMenu(response);

    } else {
      getItems();
    }
  }, [response, getItems, setMenu]);

  //https://flaviocopes.com/how-to-format-number-as-currency-javascript/
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  return (
    <>
      {menu ? menu.map((item) => (
        <Link to={`/menu/${storeId}/${item.itemId}`}>
          <Card key={item.itemId} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.imageUrl} />
            <Card.Body>
              <Card.Title>
                {item.name}
              </Card.Title>
              <Card.Text>
                Ingredients: {item.ingredients}
                            Price: {formatter.format(item.price)}
              </Card.Text>
              <Addbutton item={item} />
            </Card.Body>
          </Card>
        </Link>

      )) : <h3>Loading!</h3>}
      <Route path='/menu/:storeId/:itemId' component={ItemDetails}>

      </Route>
    </>
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