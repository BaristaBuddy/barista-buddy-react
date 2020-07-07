import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetch.js';

export default function Stores(){
    const BBurl = 'https://baristabuddyapi.azurewebsites.net/api'
    const {storeList, setStoreList} = useState([]);
    const { request, response, error, isLoading } = useFetch();
}