import { put, call, delay } from "redux-saga/effects";
import axios from "./../../utils/axios";
import * as storeActions from "./../actions";
import * as paths from "./../../utils/paths";
import { makeCode, getFormResponseError, createFormErrorsObject } from "./../../utils/utils";
import ProductObject from "./../../utils/ProductObject";
import ProductImageObject from "../../utils/ProductImageObject";
import Pages from "../../utils/Pages";

export function* addProductFormSaga(action) {
    let form = action.form;

    if (0 === form?.id) {
        return;
    }

    yield put(storeActions.resetProductForm());
    let product = new ProductObject();

    if (!form) {
        return yield put(storeActions.setProductForm(product));
    }

    if (form?.id > 0) {
        return yield put(storeActions.setProductForm(product));
    }
}

export function* changeProductFieldValueSaga(action) {
    let field = action.field;
    let content = action.content;

    if ("name" === field) {
        let code = makeCode(content);
        yield put(storeActions.setProductFieldContent('code', code));
    }

    if ("price" === field) {
        if (!(content > 0)) {
            content = 0.00;
        }

        if (content > 999999.99) {
            content = 999999.99;
        }

        if (content >= 1) {
            let priceStr = content.toString();
            if (priceStr.length > 1 && '0' === priceStr[0]) {
                content = content.replace(/^0+/, '');
            }
        }
    }

    if (action.formErrors) {
        let errors = { ...action.formErrors };
        if ("name" === field) {
            if (errors.hasOwnProperty("code")) {
                delete errors.code;
            }
        }
        if (errors.hasOwnProperty(field)) {
            delete errors[field];
        }
        yield put(storeActions.setProductFormErrors(errors));
    }

    yield put(storeActions.setProductFieldContent(field, content));
}

export function* addFormImageSaga(action) {
    const images = action.images;
    const image = new ProductImageObject();
    images.push(image);

    yield put(storeActions.setProductFormImages(images));
}

export function* removeFormImageSaga(action) {
    const image = action.image;

    const images = action.images.filter(item => item !== image);
    yield put(storeActions.setProductFormImages(images));
}

export function* setProductDefaultImage(action) {
    action.images.forEach((image) => {
        if (image === action.image) {
            return image.default = true;
        }

        image.default = false;
    });

    yield put(storeActions.setProductFormImages(action.images));
}

export function* setProductImageFile(action) {
    const image = action.images.find(item => item === action.image);
    image.imageReader = action.reader;
    image.uploadFile = action.file;

    yield put(storeActions.setProductFormImages(action.images));
}

function createFormData(action, actionType = "create") {
    let stateForm = action.form;

    const productForm = new FormData();
    productForm.append('id', stateForm.id);
    productForm.append('code', stateForm.code);
    productForm.append('name', stateForm.name);
    productForm.append('preview', stateForm.preview);
    productForm.append('description', stateForm.description);
    productForm.append('price', stateForm.price);
    if ("update" === actionType) {
        productForm.append('_method', "put");
    }

    if (action.images && action.images.length > 0) {
        action.images.forEach((elem,index) => {
            productForm.append(`images[${index}]`, elem.uploadFile);
            productForm.append(`imageDetails[${index}][id]`, elem.id);
            productForm.append(`imageDetails[${index}][name]`, elem.name);
            productForm.append(`imageDetails[${index}][description]`, elem.description);
            productForm.append(`imageDetails[${index}][default]`, elem.default);
            productForm.append(`imageDetails[${index}][assetKey]`, elem.assetKey);
        });
    }
    return productForm;
}

export function* saveProductSaga(action) {
    yield put(storeActions.setProductSaving(true));

    let actionType = "create";
    let apiPath = paths.products.create;
    if (action.form?.id > 0) {
        actionType = "update";
        apiPath = paths.products.update(action.form.id);
    }

    const productForm = createFormData(action, actionType);

    let responseObject = null;
    let isError = false;

    yield axios.post(apiPath, productForm, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }).then((response) => {
        responseObject = response;
    }).catch((error) => {
        responseObject = error.response;
        isError = true;
    });

    yield call(productActionReceived, isError, responseObject, actionType);
}

function* productActionReceived(isError, responseObject, actionType = "create") {
    if (isError) {
        yield put(storeActions.setProductSaving(false));
        yield put(storeActions.setMainMessage('error', responseObject.data.message));

        if (405 === responseObject.status) {
            if (responseObject.data?.data) {
                yield put(storeActions.setFormImageErrors(responseObject.data.data));
            }
            return;
        }

        if (responseObject.status !== 406) {
            const errorsObject = createFormErrorsObject(responseObject.data);
            yield put(storeActions.setProductFormErrors(errorsObject));
            yield put(storeActions.checkProductErrors(true));
        }

        return;
    }

    let successMessage = "Product saved!";
    if ("update" === actionType) {
        successMessage = "Product modified with success!";
    }

    yield put(storeActions.setProductSaved(true));
    yield put(storeActions.setMainMessage('success', successMessage));

    let productsPage = Pages.getByCode('products');
    yield put(storeActions.requestPageContent(productsPage));

    yield delay(1000);
    yield put(storeActions.productsActionsScreen(false));
    // reset product form and images
    yield delay(500);
    yield put(storeActions.resetProductForm());
}

export function* editProductFormSaga(action) {
    let form = action.form;
    let requestId = action.id;

    if (form?.id === requestId) {
        return;
    }

    yield put(storeActions.resetProductForm());

    // request product object from API
    let responseObject = null;
    let isError = false;

    yield axios.get(paths.products.show(requestId))
        .then((response) => {
            responseObject = response.data;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    if (!responseObject?.success) {
        yield put(storeActions.productsActionsScreen(false));
        return yield put(storeActions.setMainMessage('error', "Server error!"));
    }

    if (isError) {
        yield put(storeActions.productsActionsScreen(false));
        return yield put(storeActions.setMainMessage('error', responseObject.message));
    }

    let productData = responseObject.data;
    let product = new ProductObject();
    product.fill(productData);
    yield put(storeActions.setProductForm(product));

    let images = [];
    if (productData.images?.length > 0) {
        productData.images.forEach((imageData) => {
            let productImage = new ProductImageObject();
            productImage.fill(imageData);
            images.push(productImage);
        });
    }

    yield put(storeActions.setProductFormImages(images));
}

export function* removeProductSaga(action) {
    yield put(storeActions.setProductRemoving(true));

    if (!(action?.productId > 0)) {
        yield delay(500);
        return yield put(storeActions.setProductRemoving(true));
    }

    let responseObject = null;
    let isError = false;

    yield axios.delete(paths.products.delete(action.productId))
        .then((response) => {
            responseObject = response.data;
        })
        .catch((error) => {
            responseObject = error.response.data;
            isError = true;
        });

    if (isError) {
        return yield put(storeActions.productRemoveError(responseObject.message));
    }

    if (!responseObject.success) {
        return yield put(storeActions.productRemoveError(responseObject.message));
    }

    yield put(storeActions.productRemoveSuccess("Product removed!"));

    // reload products
    let productsPage = Pages.getByCode('products');
    yield put(storeActions.requestPageContent(productsPage));
}
