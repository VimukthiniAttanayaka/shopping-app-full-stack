import {ApolloClient, InMemoryCache} from "@apollo/client";
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const uploadLink = createUploadLink({
    uri: 'http://localhost:4500/api', // Apollo Server is served from port 4000
    headers: {
        'apollo-require-preflight': 'true',
    }
})

export const client = new ApolloClient({
    link: uploadLink,
    cache: new InMemoryCache()
});