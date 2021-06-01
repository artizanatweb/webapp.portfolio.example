import { put, call, delay } from "redux-saga/effects";
import * as storeActions from "./../actions";
import axios from "./../../utils/axios";
import { getProductDefaultImage } from "./../../utils/utils";

export function* hideDummyLoader(action) {
    if (!document.getElementById('loader')) {
        return;
    }

    let loaderElement = document.getElementById('loader');

    if (!action.show) {
        loaderElement.classList.remove('hide');
        loaderElement.style.display = 'flex';
        return loaderElement.classList.add('show');
    }

    loaderElement.classList.remove('show');
    // inject hide into class attribute
    loaderElement.classList.add('hide');
    setTimeout(() => {
        loaderElement.style.display = 'none';
    }, 500);

    delay(1000);
    yield put(storeActions.riseAppLogo(true));
}

// page content is obtain with GET request
export function* requestPageContent(action) {
    const page = action.page;

    let apiPath = page.api;
    yield put(storeActions.setApplicationLoading(true));
    console.log(`[APPLICATION] Page content from: ${apiPath}`);

    let responseData = null;
    let responseError = false;

    yield axios.get(apiPath)
        .then((response) => {
            responseData = response.data;
        })
        .catch((error) => {
            responseData = error.response;
            responseError = true;
        });

    yield put(storeActions.setApplicationLoading(false));
    if (responseError) {
        return yield put(storeActions.setMainMessage('error', 'Page content response error!'));
    }

    if (!responseData.success || !responseData.hasOwnProperty("data")) {
        return yield put(storeActions.setMainMessage('error', 'Page content response error!'));
    }

    if ("categories" === page.code) {
        return yield put(storeActions.setCategories(responseData?.data));
    }

    if ("products" === page.code) {
        return yield put(storeActions.setProducts(responseData?.data));
    }

    yield delay(1000);
    if ("product" === page.code) {
        console.log('here product data!');
        const defaultImage = getProductDefaultImage(responseData.data);
        yield put(storeActions.setProductMainImage(defaultImage));
        return yield put(storeActions.setProductData(responseData.data));
    }
}
