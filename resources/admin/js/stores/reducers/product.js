import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    data: null,
    image: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.product.SET:
            return {
                ...state,
                data: action.productData,
            }
        case actionTypes.product.SET_IMAGE:
            return {
                ...state,
                image: action.imageObject,
            }
        default:
            return state;
    }
};

export default reducer;
