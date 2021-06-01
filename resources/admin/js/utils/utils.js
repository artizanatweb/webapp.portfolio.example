export const makeCode = (string = "") => {
    return string.trim().replace(/\s+/g, '-').replace(/[^A-Za-z0-9._-]/g, "").toLowerCase();
};

export const getFormResponseError = (responseData) => {
    let errorMessage = "";
    let errorField = "";
    if (responseData && responseData.hasOwnProperty('errors')) {
        Object.keys(responseData.errors).every((field) => {
            errorMessage = responseData.errors[field];
            errorField = field;
        });
    }

    return {
        field: errorField,
        message: errorMessage,
    };
}

export const createFormErrorsObject = (responseData) => {
    const errorsObject = {};

    if (responseData && responseData.hasOwnProperty('errors')) {
        Object.keys(responseData.errors).forEach((field) => {
            errorsObject[field] = responseData.errors[field][0];
        });
    }

    return errorsObject;
}

export const getProductDefaultImage = (product) => {
    let productImage = {
        thumbnail: '/images/defaults/product-black.png',
        name: 'Missing product image',
    };

    if (product.images?.length > 0) {
        productImage = product.images[0];

        product.images.every((image) => {
            if (!image.default) {
                return true;
            }

            productImage = image;
        });
    }

    return productImage;
};
