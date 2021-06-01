import { takeEvery, all, call } from "redux-saga/effects";
import * as actionTypes from "./../actions/actionTypes";
import { hideDummyLoader, requestPageContent } from "./application";
import { authEmailChangedSaga, authPasswordChangedSaga, requestAuthenticationSaga, logoutSaga, refreshTokenSaga } from "./authentication";
import {
    changeCategoryFieldValueSaga, addCategoryFormSaga, editCategoryFormSaga,
    setCategoryImageFile, saveCategorySaga, requestCategoryRemovalSaga,
    requestCategorySaga
} from "./categories";
import {
    addProductFormSaga, changeProductFieldValueSaga, addFormImageSaga,
    removeFormImageSaga, setProductDefaultImage, setProductImageFile,
    saveProductSaga, editProductFormSaga, removeProductSaga
} from "./products";
import {
    categoryAllRequestProductsSaga, selectDialogProductSaga, assignProductsSaga,
    selectAssignedProduct, removeAssignedProductsSaga
} from "./categoryProducts";

export function* watchApplication() {
    yield takeEvery(actionTypes.application.SHOW, hideDummyLoader);
    yield takeEvery(actionTypes.application.REQUEST_PAGE_CONTENT, requestPageContent);
}

export function* watchAuthentication() {
    yield takeEvery(actionTypes.authentication.CHANGE_EMAIL, authEmailChangedSaga);
    yield takeEvery(actionTypes.authentication.CHANGE_PASSWORD, authPasswordChangedSaga);
    yield takeEvery(actionTypes.authentication.REQUEST_AUTHENTICATION, requestAuthenticationSaga);
    yield takeEvery(actionTypes.authentication.LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.authentication.WEB_STORAGE_AUTH, refreshTokenSaga);
}

export function* watchCategories() {
    yield takeEvery(actionTypes.categories.CHANGE_FIELD_CONTENT, changeCategoryFieldValueSaga);
    yield takeEvery(actionTypes.categories.ADD, addCategoryFormSaga);
    yield takeEvery(actionTypes.categories.EDIT, editCategoryFormSaga);
    yield takeEvery(actionTypes.categories.SET_IMAGE_FILE, setCategoryImageFile);
    yield takeEvery(actionTypes.categories.SAVE, saveCategorySaga);
    yield takeEvery(actionTypes.categories.REQUEST_DELETE, requestCategoryRemovalSaga);
    yield takeEvery(actionTypes.categories.REQUEST_CATEGORY, requestCategorySaga);
}

export function* watchProducts() {
    yield takeEvery(actionTypes.products.CHANGE_FIELD_CONTENT, changeProductFieldValueSaga);
    yield takeEvery(actionTypes.products.ADD, addProductFormSaga);
    yield takeEvery(actionTypes.products.ADD_IMAGE, addFormImageSaga);
    yield takeEvery(actionTypes.products.REMOVE_IMAGE, removeFormImageSaga);
    yield takeEvery(actionTypes.products.SET_DEFAULT_IMAGE, setProductDefaultImage);
    yield takeEvery(actionTypes.products.SET_IMAGE_FILE, setProductImageFile);
    yield takeEvery(actionTypes.products.SAVE, saveProductSaga);
    yield takeEvery(actionTypes.products.EDIT, editProductFormSaga);
    yield takeEvery(actionTypes.products.REQUEST_DELETE, removeProductSaga);
}

export function* watchCategoryProducts() {
    yield takeEvery(actionTypes.categoryProducts.REQUEST_PRODUCTS, categoryAllRequestProductsSaga);
    yield takeEvery(actionTypes.categoryProducts.SELECT_DIALOG_PRODUCT, selectDialogProductSaga);
    yield takeEvery(actionTypes.categoryProducts.ASSIGN_PRODUCTS, assignProductsSaga);
    yield takeEvery(actionTypes.categoryProducts.SELECT_ASSIGNED_PRODUCT, selectAssignedProduct);
    yield takeEvery(actionTypes.categoryProducts.REMOVE_ASSIGNED_PRODUCTS, removeAssignedProductsSaga);
}

export function* rootSaga() {
    yield all([
        call(watchApplication),
        call(watchAuthentication),
        call(watchCategories),
        call(watchProducts),
        call(watchCategoryProducts),
    ]);
}
