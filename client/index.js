import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';
import { HashRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import App from './components/App';
import './style/style.css';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <div>
        <App />
      </div>
    </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
