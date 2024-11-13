// import {ApolloClient, InMemoryCache} from "@apollo/client";
// import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

// const uploadLink = createUploadLink({
//     uri: 'http://localhost:4500/api', // Apollo Server is served from port 4000
//     headers: {
//         'apollo-require-preflight': 'true',
//     }
// })

// export const client = new ApolloClient({
//     link: uploadLink,
//     cache: new InMemoryCache()
// });

import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {toast} from "react-toastify";
import {getLocal} from "./index.ts";
import {AUTH_KEY} from "../static/static.ts";

// Error link to handle errors globally
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      toast.error(message)
      // Add your custom error handling logic here
    });
  }
  if (networkError) {
    toast.error("network issue")
    console.error(`[Network error]: ${networkError}`);
    // Handle network errors globally
  }
});

// Combine with other Apollo links
const httpLink = new HttpLink({
    uri: 'http://localhost:4500/api', // Apollo Server is served from port 4000
    headers: {
        'apollo-require-preflight': 'true',
        authorization: getLocal(AUTH_KEY) || ''
    }
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
