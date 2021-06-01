require('./bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import "./../sass/app.scss";
import App from "./containers/App";
import applicationReducer from "./stores/reducers/application";
import authenticationReducer from "./stores/reducers/authentication";
import mainMessageReducer from "./stores/reducers/mainMessage";
import menuReducer from "./stores/reducers/menu";
import categoriesReducer from "./stores/reducers/categories";
import productsReducer from "./stores/reducers/products";
import categoryProductsReducer from "./stores/reducers/categoryProducts";
import productReducer from "./stores/reducers/product";
import { rootSaga } from "./stores/sagas";
import APIClient from "./utils/APIClient";

const rootReducer = combineReducers({
    application: applicationReducer,
    authentication: authenticationReducer,
    mainMessage: mainMessageReducer,
    menu: menuReducer,
    categories: categoriesReducer,
    products: productsReducer,
    categoryProducts: categoryProductsReducer,
    product: productReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));
APIClient.setStore(store);

sagaMiddleware.run(rootSaga);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

if (document.getElementById("adminApp")) {
    ReactDOM.render(app, document.getElementById("adminApp"));
}
