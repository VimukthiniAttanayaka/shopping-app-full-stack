import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import {ToastProvider} from 'react-toast-notifications';
import { store } from './redux/store';
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { client } from "./utills/ApolloConfig";
import {ToastContainer} from "react-toastify";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <ToastContainer/>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <App />
                </Suspense>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>
);
