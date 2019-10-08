import React from 'react';
import { useAuth0 } from '../react-auth0-wrapper';

const AuthedLandingPage = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Authorized Landing Page after redirect</p>
    </div>
  );
};

export default AuthedLandingPage;
