import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/fetch.js';
import Card from 'react-bootstrap/Card';
import useOrders from '../../contexts/orders';

export default function Stores() {
  //needs to be dontenv
  //const todoAPI = 'https://deltav-todo.azurewebsites.net/api/v1/todos';
  const BBurl = 'https://baristabuddyapi.azurewebsites.net/api/stores'
  const [storeList, setStoreList] = useState();
  const { request, response } = useFetch();
  const { currentStore } = useOrders();



  const getStores = React.useCallback(() => {
    const requestbody = {
      url: BBurl,
      options: { method: "get" }
    }
    request(requestbody);
  }, [request]);

  //useEffect for initial Load, Can add more dependencies as needed.
  useEffect(() => {
    getStores();
  }, [getStores]);

  //setting storelist
  useEffect(() => {
    if (response.length > 0) {
      console.log(response);
      setStoreList(response);

    } else {
      getStores();
    }
  }, [response, getStores, setStoreList]);
  if (currentStore === null) {
    return (
      <>
        <h2>Our Partner Stores</h2>
        <div className="card-container">
          {storeList != null ? storeList.map((store) => (
            <Link to={`/menu/${store.id}`}
              style={{ zIndex: 1 }}
            >
              <Card key={store.id} >
                <Card.Img variant="top" src={store.storeImageUrl} alt={store.name} />
                <Card.Body>
                  <Card.Title>
                    {store.name}
                  </Card.Title>
                  <Card.Text>
                    <p>{store.streetAddress}</p>
                    <p>{store.city}, {store.state}</p>
                    <p>{store.phone}</p>
                    <a href={store.websiteUrl}>Website</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          )) : <h3>Loading!</h3>}
        </div>
      </>
    );
  } else if(currentStore !== null) {
    return (
      <>
        <h2>Our Partner Stores</h2>
        <div className="card-container">
        {console.log(currentStore)}
          {storeList != null ? storeList.filter((store)=> store.id === currentStore).map((store) => (
            <Link to={`/menu/${store.id}`}
              style={{ zIndex: 1 }}
            >
              <Card key={store.id} >
                <Card.Img variant="top" src={store.storeImageUrl} alt={store.name} />
                <Card.Body>
                  <Card.Title>
                    {store.name}
                  </Card.Title>
                  <Card.Text>
                    <p>{store.streetAddress}</p>
                    <p>{store.city}, {store.state}</p>
                    <p>{store.phone}</p>
                    <a href={store.websiteUrl}>Website</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          )) : <h3>Loading!</h3>}
        </div>
      </>
    );
  }

}