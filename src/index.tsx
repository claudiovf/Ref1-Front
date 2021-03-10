import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';



const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ 
    uri: 'https://ref1-backend.herokuapp.com' ,
    credentials: 'include',
  })
});


ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

