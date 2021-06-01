import * as actionTypes from "./actionTypes.js";

export const openCategoryProductsAssignDialog = () => {
    return (dispatch) => {
        dispatch(setCategoryAllProducts());

        dispatch({
            type: actionTypes.categoryProducts.OPEN,
        });

        dispatch(categoryRequestAllProducts());
    }
};

export const closeCategoryProductsAssignDialog = () => {
    return {
        type: actionTypes.categoryProducts.HIDE,
    }
};

export const categoryRequestAllProducts = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.categoryProducts.REQUEST_PRODUCTS,
            categories: state.categories,
        })
    }
};

export const setCategoryAllProducts = (products = null) => {
    return {
        type: actionTypes.categoryProducts.SET_PRODUCTS,
        products: products,
    }
}

export const selectDialogProduct = (id) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.categoryProducts.SELECT_DIALOG_PRODUCT,
            id: id,
            selected: state.categoryProducts.selected,
        });
    }
}

export const setSelectedProducts = (products = []) => {
    return {
        type: actionTypes.categoryProducts.SET_SELECTED,
        selected: products,
    }
}

export const assignCategoryProducts = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.categoryProducts.ASSIGN_PRODUCTS,
            selected: state.categoryProducts.selected,
            products: state.categoryProducts.products,
            form: state.categories.form,
        });
    }
};

export const selectAssignedProduct = (productId) => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.categoryProducts.SELECT_ASSIGNED_PRODUCT,
            id: productId,
            removeAssigned: state.categoryProducts.removeAssigned,
        });
    }
};

export const setRemoveAssignedProducts = (ids= []) => {
    return {
        type: actionTypes.categoryProducts.SET_REMOVE_ASSIGNED,
        removeIds: ids,
    }
};

export const removeAssignedProducts = () => {
    return (dispatch, getState) => {
        const state = getState();

        dispatch({
            type: actionTypes.categoryProducts.REMOVE_ASSIGNED_PRODUCTS,
            removeAssigned: state.categoryProducts.removeAssigned,
            form: state.categories.form,
        });
    }
};
