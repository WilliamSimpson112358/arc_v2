import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthedLandingPage from '../components/AuthedLandingPage';
import ExternalApi from '../components/ExternalApi';
import LandingPage from '../components/LandingPage';
import NavBar from '../components/NavBar';
import PrivateRoute from '../components/PrivateRoute';
import Profile from '../components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <PrivateRoute path="/authedLP" component={AuthedLandingPage} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
