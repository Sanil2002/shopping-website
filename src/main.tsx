import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
// import { persistor, store } from './app/store.ts'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
// import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-kp6ct3e8b62peb4t.us.auth0.com"
      clientId="z7e0e8bImPlFrb6H0sCiKz8uzlC0zRWm"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      useRefreshTokens={true}
      cacheLocation='localstorage'
    >
      <Router>
        <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <App />
        {/* </PersistGate> */}
        </Provider>
      </Router>
    </Auth0Provider>
  </React.StrictMode>
)
