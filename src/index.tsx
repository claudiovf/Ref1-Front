import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Fonts.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/index';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';


const cache = new InMemoryCache();

const setPersistant = async () => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
};
setPersistant();

const client = new ApolloClient({
  cache,
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

