import { useState, useEffect } from 'react';

export default function useFetch() {
    const [requestObject, request] = useState(null);
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        async function fetchData() {
            if (!requestObject) {
                return;
            }
            setIsLoading(true)
            try {
                requestObject.options.headers = { 'Content-Type': 'application/json' };
                const res = await fetch(requestObject.url, requestObject.options);
                const json = res.status === 200 && await res.json();
                setResponse(json);
                setIsLoading(false)
            } catch (error) {
                setError(error);
            }
        }
        fetchData();
    }, [requestObject]);

  // request - function that sets the request object
  // response - the response (this is stored in state, updated after the fetchdata function runs)
  // error - the response (this is stored in state, updated after the fetchdata function runs)
  // isLoading - boolean to toggle load state, changed during operation of the fetchData function
  return { request, response, error, isLoading };

}