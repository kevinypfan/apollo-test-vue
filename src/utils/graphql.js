import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';


const httpLink = new HttpLink({
  uri: `http://localhost:3000/graphql`
});

const middlewareLink = setContext(() => ({
  headers: {
    authToken: window.localStorage.getItem('authToken') || null
  }
}));

const link = middlewareLink.concat(httpLink);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

