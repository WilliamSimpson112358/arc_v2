// src/components/ExternalApi.js

import React, { useState } from 'react';
import { useAuth0 } from '../react-auth0-wrapper';

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [apiAirplaneMessage, setApiAirplaneMessage] = useState('');
  const { getTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getTokenSilently();

      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: '{hello}' })
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const callApiAirplane = async () => {
    try {
      const token = await getTokenSilently();

      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: '{info}' })
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiAirplaneMessage(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>External API</h1>
      <button onClick={callApi}>Ping hello</button>
      {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
      <button onClick={callApiAirplane}>Ping airplane</button>
      {showResult && <code>{JSON.stringify(apiAirplaneMessage, null, 2)}</code>}
    </>
  );
};

export default ExternalApi;
