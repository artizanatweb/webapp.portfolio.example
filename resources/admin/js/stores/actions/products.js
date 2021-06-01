import * as actionTypes from "./actionTypes.js";
import * as storeActions from "./index";

export const setProducts = (products = []) => {
    return {
        type: actionTypes.products.SET_ITEMS,
        products: products,
    }
}

export const productsActionsScreen = (open = false) => {
    return {
        type: actionTypes.products.ACTIONS_SCREEN,
        open: open,
    }
}

export const setProductForm = (formObject) => {
    return {
        type: actionTypes.products.SET_FORM,
        formObject: formObject,
    }
}

export const changeProductFieldContent = (field, content) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.products.CHANGE_FIELD_CONTENT,
            field: field,
            content: content,
            formErrors: state.products.formErrors,
        });
    }
};

export const setProductFieldContent = (field, content) => {
    return {
        type: actionTypes.products.SET_FIELD_CONTENT,
        field: field,
        content: content,
    }
};

export const addFormProduct = () => {
    return (dispatch, getState) => {
        const state = getState();

        return dispatch({
            type: actionTypes.products.ADD,
            form: state.products.form,
        });
    }
};

export const editFormProduct = (id = 0) => {
    return (dispatch, getState) => {
        const state = getState();

        return dispatch({
            type: actionTypes.products.EDIT,
            form: state.products.form,
            id: id,
        });
    }
};

export const addProductImageElement = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: actionTypes.products.ADD_IMAGE,
            images: state.products.formImages,
        });
    }
};

export const setProductFormImages = (images = []) => {
    return {
        type: actionTypes.products.SET_FORM_IMAGES,
        images: images,
    }
};

export const removeProductImageElement = (imageObj) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: actionTypes.products.REMOVE_IMAGE,
            image: imageObj,
            images: state.products.formImages,
        });
    }
};

export const changeImageField = (field, value, image) => {
    return (dispatch, getState) => {
        const state = getState();

        if ('default' === field && value) {
            return dispatch({
                type: actionTypes.products.SET_DEFAULT_IMAGE,
                image: image,
                images: state.products.formImages,
            });
        }

        const chImage = state.products.formImages.find(item => item === image);
        chImage[field] = value;

        dispatch(setProductFormImages(state.products.formImages));

        if (!state.products.formImageErrors) {
            return;
        }

        if (!state.products.formImageErrors.hasOwnProperty(image.assetKey)) {
            return;
        }

        if (!(field === state.products.formImageErrors[image.assetKey])) {
            return
        }

        dispatch(setFormImageErrors());
    }
}

export const addProductFileImage = (file, reader, imageObject) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.products.SET_IMAGE_FILE,
            file: file,
            reader: reader,
            image: imageObject,
            images: state.products.formImages,
        });
    }
};

export const requestProductSave = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.products.SAVE,
            form: state.products.form,
            images: state.products.formImages,
        });
    }
};

export const setProductSaving = (saving = false) => {
    return {
        type: actionTypes.products.SAVING,
        saving: saving,
    }
};

export const setProductFormErrors = (errorsObject = null) => {
    return {
        type: actionTypes.products.SET_FORM_ERRORS,
        errorsObject: errorsObject,
    }
};

export const setProductSaved = (saved = false) => {
    return {
        type: actionTypes.products.SAVED,
        saved: saved,
    }
};

export const resetProductForm = () => {
    return {
        type: actionTypes.products.RESET,
    }
};

export const checkProductErrors = (check = false) => {
    return {
        type: actionTypes.products.CHECK_ERRORS,
        check: check,
    }
};

export const setFormImageErrors = (error = null) => {
    return {
        type: actionTypes.products.FORM_IMAGE_ERRORS,
        error: error,
    }
};

export const setProductRemoving = (removing = false) => {
    return {
        type: actionTypes.products.REMOVING,
        removing: removing,
    }
};

export const productRemoveDialog = (open = false, id = null) => {
    return {
        type: actionTypes.products.DELETE,
        open: open,
        id: id,
    }
};

export const requestProductRemoval = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.products.REQUEST_DELETE,
            productId: state.products.deleteId,
        });
    }
};

export const productRemoveError = (message = "") => {
    return (dispatch) => {
        dispatch(storeActions.setMainMessage('error', message));
        dispatch(setProductRemoving(false));
    }
};

export const productRemoveSuccess = (message = "") => {
    return (dispatch) => {
        dispatch(storeActions.setMainMessage('success', message));
        dispatch(productRemoveDialog());
        dispatch(setProductRemoving(false));
    }
};
