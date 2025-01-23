import './main.css'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router';

import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('graphLibrary-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: null
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <Router>
        <App />
    </Router>
  </ApolloProvider>
);
