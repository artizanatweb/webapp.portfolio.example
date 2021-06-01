import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    items: [],
    actionsScreen: false,
    saving: false,
    saved: false,
    removing: false,
    form: null,
    errorField: null,
    deleteDialog: false,
    deleteId: null,
    category: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.categories.SET_ITEMS:
            return {
                ...state,
                items: action.categories,
            }
        case actionTypes.categories.ACTIONS_SCREEN:
            return {
                ...state,
                actionsScreen: action.open,
            }
        case actionTypes.categories.SET_FORM:
            return {
                ...state,
                form: action.form,
                saved: false,
            }
        case actionTypes.categories.SET_FIELD_CONTENT:
            let actualForm = state.form;
            actualForm[action.field] = action.content;

            let errorField = state.errorField;
            if (errorField === action.field) {
                errorField = null;
            }
            return {
                ...state,
                form: {
                    ...actualForm,
                },
                errorField: errorField,
            }
        case actionTypes.categories.RESET:
            return {
                ...state,
                form: null,
                saved: false,
                errorField: null,
            }
        case actionTypes.categories.SAVING:
            return {
                ...state,
                saving: action.saving,
            }
        case actionTypes.categories.ERROR_FIELD:
            return {
                ...state,
                errorField: action.field,
            }
        case actionTypes.categories.SAVED:
            return {
                ...state,
                saved: true,
            }
        case actionTypes.categories.REMOVING:
            return {
                ...state,
                removing: action.removing,
            }
        case actionTypes.categories.DELETE:
            return {
                ...state,
                deleteDialog: action.dialog,
                deleteId: action.deleteId,
            }
        case actionTypes.categories.SET_CATEGORY:
            return {
                ...state,
                category: action.category,
            }
        case actionTypes.categories.SET_FORM_PRODUCTS:
            return {
                ...state,
                form: {
                    ...state.form,
                    products: action.products,
                }
            }
        default:
            return state;
    }
};

export default reducer;
