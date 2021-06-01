import { put, call, delay } from "redux-saga/effects";
import axios from "./../../utils/axios";
import * as storeActions from "./../actions";
import * as paths from "./../../utils/paths";
import { makeCode, getFormResponseError } from "./../../utils/utils";
import CategoryObject from "./../../utils/CategoryObject";
import Pages from "../../utils/Pages";

export function* changeCategoryFieldValueSaga(action) {
    let field = action.field;
    let content = action.content;

    if ("name" === field) {
        let code = makeCode(content);
        yield put(storeActions.setCategoryFieldContent('code', code));
    }

    if ("position" === field) {
        if (!(content > 0)) {
            content = 0;
        }
    }

    yield put(storeActions.setCategoryFieldContent(field, content));
}

export function* addCategoryFormSaga(action) {
    let form = action.form;

    if (0 === form?.id) {
        return;
    }

    let category = new CategoryObject();

    if (!form) {
        return yield put(storeActions.setCategoryForm(category));
    }

    if (form?.id > 0) {
        return yield put(storeActions.setCategoryForm(category));
    }
}

export function* editCategoryFormSaga(action) {
    let form = action.form;
    let requestId = action.id;

    if (form?.id === requestId) {
        return;
    }

    yield put(storeActions.resetCategoryForm());

    // request category object from API
    let responseObject = null;
    let isError = false;

    yield axios.get(paths.categories.show(requestId))
        .then((response) => {
            responseObject = response.data;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    if (!responseObject?.success) {
        yield put(storeActions.categoriesActionScreen(false));
        return yield put(storeActions.setMainMessage('error', "Server error!"));
    }

    if (isError) {
        yield put(storeActions.categoriesActionScreen(false));
        return yield put(storeActions.setMainMessage('error', responseObject.message));
    }

    let category = new CategoryObject();
    category.fill(responseObject.data);
    return yield put(storeActions.setCategoryForm(category));
}

export function* setCategoryImageFile(action) {
    const category = action.formObject;
    category.imageReader = action.reader;
    category.uploadFile = action.file;

    yield put(storeActions.setCategoryForm(category));
}

function categoryFormData(action, actionType = "create") {
    const categoryForm = new FormData();
    categoryForm.append('id', action.form.id);
    categoryForm.append('name', action.form.name);
    categoryForm.append('code', action.form.code);
    categoryForm.append('preview', action.form.preview);
    categoryForm.append('description', action.form.description);
    categoryForm.append('position', action.form.position);
    if (action.form?.uploadFile) {
        categoryForm.append('file', action.form.uploadFile);
    }

    if (action.form?.products?.length > 0) {
        action.form.products.forEach((product) => {
            categoryForm.append('products[]', product.id);
        });
    }

    if ("update" === actionType) {
        categoryForm.append('_method', "put");
    }

    return categoryForm;
}

export function* saveCategorySaga(action) {
    yield put(storeActions.categorySaving(true));

    let actionType = "create";
    let apiPath = paths.categories.create;
    if (action.form?.id > 0) {
        actionType = "update";
        apiPath = paths.categories.update(action.form.id);
    }

    const categoryForm = categoryFormData(action, actionType);

    let responseObject = null;
    let isError = false;

    yield axios.post(apiPath, categoryForm)
        .then((response) => {
            responseObject = response;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    yield call(categoryActionReceived, isError, responseObject);
}

function* categoryActionReceived(isError, responseObject, actionType = "create") {
    if (isError && responseObject.status !== 406) {
        let error = getFormResponseError(responseObject.data);
        yield put(storeActions.categorySaving(false));
        yield put(storeActions.categoryErrorField(error.field));
        return yield put(storeActions.setMainMessage('error', error.message));
    }

    if (isError) {
        yield put(storeActions.categorySaving(false));
        return yield put(storeActions.setMainMessage('error', responseObject.data.message));
    }

    let successMessage = "Category saved!";
    if ("update" === actionType) {
        successMessage = "Category modified with success!";
    }
    yield put(storeActions.setMainMessage('success', successMessage));
    yield put(storeActions.categorySaved(true));
    yield delay(1000);
    yield put(storeActions.categorySaving(false));
    yield put(storeActions.categoriesActionScreen());

    // reset project form, images and videos
    yield put(storeActions.resetCategoryForm());

    // reload categories
    let categoriesPage = Pages.getByCode('categories');
    yield put(storeActions.requestPageContent(categoriesPage));
}

export function* requestCategoryRemovalSaga(action) {
    yield put(storeActions.setCategoryRemoving(true));

    if (!(action?.id > 0)) {
        yield delay(500);
        return yield put(storeActions.setCategoryRemoving(false));
    }

    let responseObject = null;
    let isError = false;

    yield axios.delete(paths.categories.delete(action.id))
        .then((response) => {
            responseObject = response.data;
        })
        .catch((error) => {
            responseObject = error.response.data;
            isError = true;
        });

    if (isError) {
        return yield put(storeActions.categoryRemoveError(responseObject.message));
    }

    if (!responseObject.success) {
        return yield put(storeActions.categoryRemoveError(responseObject.message));
    }

    yield put(storeActions.categoryRemoveSuccess("Category removed!"));

    // reload categories
    let categoriesPage = Pages.getByCode('categories');
    yield put(storeActions.requestPageContent(categoriesPage));
}

export function* requestCategorySaga(action) {
    if (!(action?.id > 0)) {
        return
    }

    // request category object from API
    let responseObject = null;
    let isError = false;

    yield axios.get(paths.categories.show(action.id))
        .then((response) => {
            responseObject = response.data;
        })
        .catch((error) => {
            responseObject = error.response;
            isError = true;
        });

    if (isError) {
        yield put(storeActions.setApplicationLoading());
        return yield put(storeActions.setMainMessage('error', responseObject.message));
    }

    if (!responseObject.success) {
        yield put(storeActions.setApplicationLoading());
        return yield put(storeActions.setMainMessage('error', responseObject.message));
    }

    yield put(storeActions.setCategory(responseObject.data));
    yield put(storeActions.setApplicationLoading());
}
