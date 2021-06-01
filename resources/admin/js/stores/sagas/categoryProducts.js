import { put, call, delay } from "redux-saga/effects";
import axios from "./../../utils/axios";
import * as storeActions from "./../actions";
import Pages from "../../utils/Pages";

export function* categoryAllRequestProductsSaga(action) {
    const storeCategories = action.categories;

    let productsPage = Pages.getByCode('products');

    let responseData = null;
    let responseError = false;

    yield axios.get(productsPage.api)
        .then((response) => {
            responseData = response.data;
        })
        .catch((error) => {
            responseData = error.response;
            responseError = true;
        });

    if (responseError) {
        return yield put(storeActions.setMainMessage('error', 'Page content response error!'));
    }

    if (!responseData.success || !responseData.hasOwnProperty("data")) {
        return yield put(storeActions.setMainMessage('error', 'Page content response error!'));
    }

    let products = responseData.data;
    if (storeCategories.form.products?.length > 0) {
        const formProducts = [
            ...storeCategories.form.products
        ];
        const usedIds = [];
        for (let i = 0; i < formProducts.length; i++) {
            usedIds.push(formProducts[i]?.id);
        }

        products = products.filter( item => !usedIds.includes(item.id) );
    }

    yield put(storeActions.setCategoryAllProducts(products));
}

export function* selectDialogProductSaga(action) {
    const selected = action.selected;

    if (selected.includes(action.id)) {
        const products = selected.filter(item => item !== action.id);
        return yield put(storeActions.setSelectedProducts(products));
    }

    selected.push(action.id);
    yield put(storeActions.setSelectedProducts(selected));
}

export function* assignProductsSaga(action) {
    const formProducts = action.form.products;

    const products = [
        ...action.products
    ];

    for (let i=0; i < products.length; i++) {
        if (!action.selected.includes(products[i]?.id)) {
            continue;
        }

        formProducts.push(products[i]);
    }

    yield put(storeActions.closeCategoryProductsAssignDialog());
}

export function* selectAssignedProduct(action) {
    const selected = action.removeAssigned;

    if (selected.includes(action.id)) {
        const selectAssigned = selected.filter(item => item !== action.id);
        return yield put(storeActions.setRemoveAssignedProducts(selectAssigned));
    }

    selected.push(action.id);
    yield put(storeActions.setRemoveAssignedProducts(selected));
}

export function* removeAssignedProductsSaga(action) {
    if (!(action.form?.products?.length > 0)) {
        return;
    }

    if (!(action.removeAssigned?.length > 0)) {
        return;
    }

    const formProducts = action.form.products.filter( product => !action.removeAssigned.includes(product.id) );
    yield put(storeActions.setCategoryFormProducts(formProducts));
    yield put(storeActions.setRemoveAssignedProducts([]));
}
