import React from 'react';
import ReactDOM from 'react-dom';
import config from './auth_config.json';
import App from './components/App';
import { Auth0Provider } from './react-auth0-wrapper';
import * as serviceWorker from './serviceWorker';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    onRedirectCallback={onRedirectCallback}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
