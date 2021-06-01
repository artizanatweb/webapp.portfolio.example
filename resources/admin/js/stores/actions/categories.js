import * as actionTypes from "./actionTypes.js";
import * as storeActions from "./index";

export const setCategories = (categories = []) => {
    return {
        type: actionTypes.categories.SET_ITEMS,
        categories: categories,
    }
};

export const categoriesActionScreen = (open = false) => {
    return {
        type: actionTypes.categories.ACTIONS_SCREEN,
        open: open,
    }
};

export const setCategoryForm = (formObject) => {
    return {
        type: actionTypes.categories.SET_FORM,
        form: formObject,
    }
};

export const addFormCategory = () => {
    return (dispatch, getState) => {
        const state = getState();

        return dispatch({
            type: actionTypes.categories.ADD,
            form: state.categories.form,
        });
    }
};

export const editFormCategory = (id = 0) => {
    return (dispatch, getState) => {
        const state = getState();

        return dispatch({
            type: actionTypes.categories.EDIT,
            form: state.categories.form,
            id: id,
        });
    }
};

export const changeCategoryFieldContent = (field, content) => {
    return {
        type: actionTypes.categories.CHANGE_FIELD_CONTENT,
        field: field,
        content: content,
    }
};

export const setCategoryFieldContent = (field, content) => {
    return {
        type: actionTypes.categories.SET_FIELD_CONTENT,
        field: field,
        content: content,
    }
};

export const resetCategoryForm = () => {
    return {
        type: actionTypes.categories.RESET,
    }
};

export const categoryFileImage = (file, reader) => {
    return (dispatch, getState) => {
        const state = getState();

        if ('file' === state.categories.errorField) {
            dispatch(categoryErrorField());
        }

        dispatch({
            type: actionTypes.categories.SET_IMAGE_FILE,
            file: file,
            reader: reader,
            formObject: state.categories.form,
        });
    }
};

export const categorySaving = (saving = false) => {
    return {
        type: actionTypes.categories.SAVING,
        saving: saving,
    }
};

export const requestCategorySave = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.categories.SAVE,
            form: state.categories.form,
        });
    }
};

export const categorySaved = (saved = false) => {
    return {
        type: actionTypes.categories.SAVED,
        saved: saved,
    }
};

export const categoryErrorField = (field = null) => {
    return {
        type: actionTypes.categories.ERROR_FIELD,
        field: field,
    }
};

export const setCategoryRemoving = (removing = false) => {
    return {
        type: actionTypes.categories.REMOVING,
        removing: removing,
    }
};

export const requestCategoryRemoval = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.categories.REQUEST_DELETE,
            id: state.categories.deleteId,
        });
    }
}

export const openCategoryDeleteDialog = (deleteId) => {
    return {
        type: actionTypes.categories.DELETE,
        dialog: true,
        deleteId: deleteId,
    }
};

export const closeCategoryDeleteDialog = () => {
    return {
        type: actionTypes.categories.DELETE,
        dialog: false,
        deleteId: null,
    }
};

export const categoryRemoveError = (message = "") => {
    return (dispatch) => {
        dispatch(storeActions.setMainMessage('error', message));
        dispatch(setCategoryRemoving(false));
    }
};

export const categoryRemoveSuccess = (message = "") => {
    return (dispatch) => {
        dispatch(storeActions.setMainMessage('success', message));
        dispatch(closeCategoryDeleteDialog());
        dispatch(setCategoryRemoving(false));
    }
};

export const requestCategory = (id) => {
    return {
        type: actionTypes.categories.REQUEST_CATEGORY,
        id: id,
    }
};

export const setCategory = (category) => {
    return {
        type: actionTypes.categories.SET_CATEGORY,
        category: category,
    }
};

export const setCategoryFormProducts = (products = []) => {
    return {
        type: actionTypes.categories.SET_FORM_PRODUCTS,
        products: products,
    }
};
