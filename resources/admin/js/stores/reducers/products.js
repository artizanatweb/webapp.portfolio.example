import * as actionTypes from "./../actions/actionTypes";

const initialState = {
    items: [],
    actionsScreen: false,
    form: null,
    formImages: [],
    formErrors: null,
    saved: false,
    saving: false,
    checkErrors: false,
    formImageErrors: null,
    removing: false,
    openDeleteDialog: false,
    deleteId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.products.SET_ITEMS:
            return {
                ...state,
                items: action.products,
            }
        case actionTypes.products.ACTIONS_SCREEN:
            return {
                ...state,
                actionsScreen: action.open,
            }
        case actionTypes.products.SET_FORM:
            return {
                ...state,
                form: action.formObject,
            }
        case actionTypes.products.SET_FIELD_CONTENT:
            let actualForm = state.form;
            actualForm[action.field] = action.content;

            return {
                ...state,
                form: {
                    ...actualForm,
                },
                checkErrors: false,
            }
        case actionTypes.products.SET_FORM_IMAGES:
            return {
                ...state,
                formImages: [
                    ...action.images,
                ],
            }
        case actionTypes.products.SAVING:
            return {
                ...state,
                saving: action.saving,
            }
        case actionTypes.products.SET_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.errorsObject,
            }
        case actionTypes.products.SAVED:
            return {
                ...state,
                saved: action.saved,
            }
        case actionTypes.products.RESET:
            return {
                ...state,
                form: null,
                formImages: [],
                formErrors: null,
                saved: false,
                saving: false,
            }
        case actionTypes.products.CHECK_ERRORS:
            return {
                ...state,
                checkErrors: action.check,
            }
        case actionTypes.products.FORM_IMAGE_ERRORS:
            return {
                ...state,
                formImageErrors: action.error,
            }
        case actionTypes.products.REMOVING:
            return {
                ...state,
                removing: action.removing,
            }
        case actionTypes.products.DELETE:
            return {
                ...state,
                openDeleteDialog: action.open,
                deleteId: action.id,
            }
        default:
            return state;
    }
};

export default reducer;
