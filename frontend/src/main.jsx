import React from 'react';
import { Auth0Provider } from "@auth0/auth0-react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider 
      domain="dev-d406uafbpwpogkiq.us.auth0.com"
      clientId="pNEbX4h9aZX7noisRZOLPpqD6vHIa7hW"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
