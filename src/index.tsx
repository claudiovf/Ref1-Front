import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/index';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';



const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ 
    uri: 'https://ref1-backend.herokuapp.com',
    credentials: 'include',
  })
});

const store = createStore(rootReducer);


ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

