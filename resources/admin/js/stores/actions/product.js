import * as actionTypes from "./actionTypes.js";

export const setProductData = (productData) => {
    return {
        type: actionTypes.product.SET,
        productData: productData,
    }
};

export const setProductMainImage = (imageObject = null) => {
    return {
        type: actionTypes.product.SET_IMAGE,
        imageObject: imageObject,
    }
};
