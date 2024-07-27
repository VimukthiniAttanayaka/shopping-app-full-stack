import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import {ToastProvider} from 'react-toast-notifications';
import {store} from './redux/store';
import {Provider} from "react-redux";
import {ApolloProvider} from "@apollo/client";
import {client} from "./utills/ApolloConfig";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                {/*<ToastProvider placement="top-center">*/}
                    <Suspense fallback={<h1>Loading...</h1>}>
                    <App/>
                    </Suspense>
                {/*</ToastProvider>*/}
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
