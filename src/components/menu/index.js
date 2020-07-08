import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetch.js';
import { useParams } from 'react-router-dom';

export default function (props) {

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

    //useEffect for inital Load, Can add more dependencies as needed.
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

    return (
        <>
            <h1>This is where the menu goes!</h1>
            <h3>{storeId}</h3>
        </>
    )
}