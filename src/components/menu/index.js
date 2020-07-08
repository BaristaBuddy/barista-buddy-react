import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/fetch.js';
import { useParams } from 'react-router-dom';

export default function(props){



    const {storeId} = useParams();
    return(
        <>
        <h1>This is where the menu goes!</h1>
        <h3>{storeId}</h3>
        </>
    )
}