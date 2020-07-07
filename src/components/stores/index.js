import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetch.js';

export default function Stores(){
    const BBurl = 'https://baristabuddyapi.azurewebsites.net/api/stores'
    const {storeList, setStoreList} = useState([]);
    const { request, response, error, isLoading } = useFetch();



    const getStores = React.useCallback(()=>{
        const request = {
            url: BBurl,
            options: {method: "get"}
        }
        request(request);
    }, [request]);

    //useEffect for inital Load, Can add more dependencies as needed.
    useEffect(()=>{
        getStores();
    }, [getStores]);

    //setting storelist
    useEffect(()=>{
        if(response.length > 0){
         setStoreList(response);
        } else {
            getStores();
        }
    }, [response, getStores, setStoreList])



}