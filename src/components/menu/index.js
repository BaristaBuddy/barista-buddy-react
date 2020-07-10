import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetch.js';
import { useParams, Link, Route, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Modal from '../modal';
// import useOrders from '../../contexts/orders';
import ItemDetails from './../itemDetails';


export default function Menu(props) {

  const { storeId } = useParams();
  const history = useHistory();
  const { request, response } = useFetch();
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
      <Route path='/menu/:storeId/:itemId'>
        <ItemDetails onClose={() => history.push(`/menu/${storeId}`)} />
      </Route>
      <div className="card-container">
        {menu ? menu.map((item) => (
          <Link to={`/menu/${storeId}/${item.itemId}`}
            style={{ zIndex: 1 }}
            className="card-link"
          >
            <Card key={item.itemId}>
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body>
                <Card.Title>
                  {item.name}
                </Card.Title>
                <Card.Text>
                  Ingredients: {item.ingredients}
                Price: {formatter.format(item.price)}
                </Card.Text>
                {/* <Addbutton item={item} /> */}
              </Card.Body>
            </Card>
          </Link>
        )) : <h3>Loading!</h3>}
      </div>
    </>
  )
}

// function Addbutton(props) {

//   const { addNew } = useOrders();

//   return (
//     <button onClick={() => addNew(props.item)}>
//       add to cart
//     </button>
//   )
// }