import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/fetch.js';
import Card from 'react-bootstrap/Card';

export default function Stores() {
  //needs to be dontenv
  //const todoAPI = 'https://deltav-todo.azurewebsites.net/api/v1/todos';
  const BBurl = 'https://baristabuddyapi.azurewebsites.net/api/stores'
  const [storeList, setStoreList] = useState();
  const { request, response, error, isLoading } = useFetch();



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

  return (
    <>
      <h2>Our Partner Stores</h2>
      {storeList != null ? storeList.map((store) => (
        <Link to={{
          pathname: `/menu/${store.id}`,
          // state: {
          //   entry: store.id,
          // }
        }}>
          <Card key={store.id} style={{ width: '18rem'}}>
            <Card.Img variant="top" src={store.storeImageUrl} alt={store.name} />
            <Card.Body>
              <Card.Title>
                {store.name}
              </Card.Title>
              <Card.Text>
                <p>Street Address: {store.streetAddress}</p>
                <p>City, State: {store.city}, {store.state}</p>
                <p>Zip Code: {store.zip}</p>
                <p>Phone: {store.phone}</p>
                <a href={store.websiteUrl}>Go to Their Site!</a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      )) : <h3>Loading!</h3>}
    </>
  );

}