import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetch.js';

export default function Stores() {
    //needs to be dontenv
    //const todoAPI = 'https://deltav-todo.azurewebsites.net/api/v1/todos';
    const BBurl = 'https://baristabuddyapi.azurewebsites.net/api/stores'
    const [ storeList, setStoreList ] = useState();
    const { request, response, error, isLoading } = useFetch();



    const getStores = React.useCallback(() => {
        const requestbody = {
            url: BBurl,
            options: { method: "get" }
        }
        request(requestbody);
    }, [request]);

    //useEffect for inital Load, Can add more dependencies as needed.
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
        <ul>
        {storeList != null ? storeList.map((store) =>(
            <li><h3>{store.name}</h3>
            <img src={store.storeImageUrl} alt="store"/>
            </li>
        )) : <h3>Loading!</h3>}
        </ul>
        </>
    );

}