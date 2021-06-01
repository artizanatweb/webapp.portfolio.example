import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    openDialog: false,
    products: null,
    selected: [],
    removeAssigned: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.categoryProducts.OPEN:
            return {
                ...state,
                openDialog: true,
                selected: [],
            }
        case actionTypes.categoryProducts.HIDE:
            return {
                ...state,
                openDialog: false,
                selected: [],
            }
        case actionTypes.categoryProducts.SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
            }
        case actionTypes.categoryProducts.SET_SELECTED:
            return {
                ...state,
                selected: action.selected,
            }
        case actionTypes.categoryProducts.SET_REMOVE_ASSIGNED:
            return {
                ...state,
                removeAssigned: action.removeIds,
            }
        default:
            return state;
    }
};

export default reducer;
