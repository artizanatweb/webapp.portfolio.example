import React, { Component, forwardRef, createRef } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
    Dialog,
    Slide,
    IconButton,
    Toolbar,
    AppBar,
    Divider,
    Typography,
    Button,
    TextField,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    Fab,
    CircularProgress,
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import * as storeActions from "./../stores/actions";
import RoundLoading from "./../components/RoundLoading";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-dna";
import {green, grey, orange, purple, pink, red, deepPurple} from '@material-ui/core/colors';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import ImageElement from "./../components/products/ImageElement";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    field: {
        width: '100%',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonSave: {
        backgroundColor: theme.palette.secondary.main,
        color: '#ffffff',
        '&:hover': {
            backgroundColor: theme.palette.secondary[600],
        },
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
});

const Trasition = forwardRef(function Trasition(props, ref) {
    return <Slide direction={"up"} ref={ref} {...props} />;
});

class ProductActionScreen extends Component {
    constructor(props) {
        super(props);

        this.refFields = {
            code: createRef(),
            name: createRef(),
            price: createRef(),
            preview: createRef(),
        };
        this.focused = false;
        this.focusTimer = 0;

        this.editor = null;

        this.allowedTypes = ['image/png', 'image/jpeg'];

        this.bottomElementRef = createRef();
        this.imagesBottomElementRef = createRef();
        this.lastImageElementRef = createRef();

        // this.bottomTimer = 0;
        this.imageBottomTimer = 0;

        this.fieldMessages = {
            code: "Unique code for this product.",
            name: "Name of this product.",
            price: "Product price.",
            preview: "Preview text for this product.",
            description: "Product full description.",
        };
    }

    getFieldState(field) {
        const result = {
            error: false,
            message: this.fieldMessages[field],
        };

        if (!this.props.products.formErrors) {
            return result;
        }

        if (Object.keys(this.props.products.formErrors).includes(field)) {
            result.error = true;
            result.message = this.props.products.formErrors[field];
        }

        return result;
    }

    focusField(field) {
        if (!field) {
            return;
        }

        if ('description' === field) {
            return this.focusEditor();
        }

        if ('code' === field) {
            field = 'name';
        }

        clearTimeout(this.focusTimer);
        this.focusTimer = setTimeout(() => {
            this.refFields[field].current.focus();
        }, 500);
    }

    focusEditor() {
        clearTimeout(this.focusTimer);
        this.focusTimer = setTimeout(() => {
            this.editor.editing.view.focus();
        }, 500);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.products.actionsScreen) {
            if (this.focused) {
                this.focused = false;
            }

            return;
        }

        if (!this.props.products.form) {
            return;
        }

        if (this.props.products.formErrors && this.props.products.checkErrors) {
            Object.keys(this.props.products.formErrors).every((field) => {
                if ("descriprion" === field) {
                    this.focusEditor();
                    return false;
                }

                this.focusField(field);
                return false;
            });
        }

        if (this.focused) {
            return;
        }

        clearTimeout(this.focusTimer);
        this.focusTimer = setTimeout(() =>{
            if (!this.refFields.name.current) {
                return;
            }

            this.focused = true;
            this.refFields.name.current.focus();
        }, 500);
    }

    closeHandler() {
        if (this.props.products.saving) {
            return;
        }

        this.props.close();
    }

    saveHandler() {
        if (this.props.products.saving) {
            return;
        }

        this.props.save();
    }

    fieldChanged(fieldName, event) {
        let content = event.target.value;

        this.props.setFieldContent(fieldName, content);
    }

    editorHandler(content) {
        this.props.setFieldContent('description', content);
    }

    addImageHandler() {
        if (!this.props.products.form) {
            return;
        }

        this.props.addImage();

        clearTimeout(this.imageBottomTimer);
        this.imageBottomTimer = setTimeout(() => {
            this.scrollToLastImage();
        }, 300);
    }

    scrollToLastImage() {
        this.lastImageElementRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToImagesBottom() {
        this.imagesBottomElementRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToBottom() {
        this.bottomElementRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    showForm() {
        if (!this.props.products.form) {
            return <RoundLoading />;
        }

        const images = [];
        this.props.products.formImages.forEach((imageObj, index) => {
            let imageElement = <ImageElement key={`project_image_${index}`} image={imageObj} elementIndex={index} />;
            if (index === (this.props.products.formImages.length - 1)) {
                imageElement = <ImageElement key={`project_image_${index}`} image={imageObj} elementIndex={index} forwardedRef={this.lastImageElementRef} />;
            }
            images.push(imageElement);
        });

        const priceProps = {
            step: 0.01,
            min: 0.00,
            max: 999999.99,
        };

        const fieldState = {
            code: this.getFieldState('code'),
            name: this.getFieldState('name'),
            price: this.getFieldState('price'),
            preview: this.getFieldState('preview'),
            description: this.getFieldState('description')
        };

        return (
            <form noValidate autoComplete={"off"} className={"actionScreenForm"}>
                <FormControl className="formRow" error={fieldState.code.error}>
                    <TextField className={this.props.classes.field} label="Code" value={this.props.products.form.code} />
                    <FormHelperText>{fieldState.code.message}</FormHelperText>
                </FormControl>
                <FormControl className="formRow" error={fieldState.name.error}>
                    <TextField inputRef={this.refFields.name} className={this.props.classes.field} label="Name" value={this.props.products.form.name} onChange={this.fieldChanged.bind(this, 'name')} />
                    <FormHelperText>{fieldState.name.message}</FormHelperText>
                </FormControl>
                <FormControl className="formRow" error={fieldState.price.error}>
                    <TextField
                        className={this.props.classes.field}
                        label="Price"
                        value={this.props.products.form.price}
                        onChange={this.fieldChanged.bind(this, 'price')}
                        type="number"
                        inputProps={priceProps}
                        inputRef={this.refFields.price}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText>{fieldState.price.message}</FormHelperText>
                </FormControl>
                <FormControl className="formRow" error={fieldState.preview.error}>
                    <TextField
                        className={this.props.classes.field}
                        label="Preview text"
                        value={this.props.products.form.preview}
                        onChange={this.fieldChanged.bind(this, 'preview')}
                        multiline
                        rows={5}
                        rowsMax={10}
                        inputRef={this.refFields.preview}
                    />
                    <FormHelperText>{fieldState.preview.message}</FormHelperText>
                </FormControl>
                <FormControl className="formRow textEditorRow">
                    <Typography className={clsx("MuiFormLabel-root", "editorLabel")}>Product description:</Typography>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.props.products.form.description}
                        onReady={
                            edt => {
                                //console.log("Editor is ready");
                                this.editor = edt;
                            }
                        }
                        onChange={
                            (event, editor) => {
                                const data = editor.getData();
                                this.editorHandler(data);
                            }
                        }
                        onBlur={
                            (event, editor) => {}
                        }
                        onFocus={
                            (event, editor) => {}
                        }
                    />
                    <FormHelperText error={fieldState.description.error}>{fieldState.description.message}</FormHelperText>
                </FormControl>
                <div className={"imagesList"}>
                    { images }
                </div>
                <div ref={this.imagesBottomElementRef} />
                <div ref={this.bottomElementRef} />
            </form>
        );
    }

    render() {
        const classes = this.props.classes;

        let dialogTitle = "Add new product";
        if (this.props.products.form?.id > 0) {
            dialogTitle = `Edit product`;
        }

        const buttonClassname = clsx({
            [this.props.classes.buttonSuccess]: this.props.products.saved,
            [this.props.classes.buttonSave]: !this.props.products.saved,
        });

        return (
            <div className={"categoryActionScreen"}>
                <Dialog fullScreen={true} open={ this.props.products.actionsScreen } TransitionComponent={ Trasition } onClose={this.closeHandler.bind(this)} className={"categoryActionsDialog"}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge={"start"} color={"inherit"} onClick={this.closeHandler.bind(this)} aria-label={"close"}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant={"h6"} className={classes.title}>{ dialogTitle }</Typography>
                            <div className={classes.wrapper}>
                                <Fab
                                    aria-label="save"
                                    olor={"inherit"}
                                    className={`${buttonClassname} saveButton`}
                                    onClick={this.saveHandler.bind(this)}
                                >
                                    { this.props.products.saved ? <CheckIcon /> : <SaveIcon /> }
                                </Fab>
                                {this.props.products.saving && <CircularProgress size={68} className={classes.fabProgress} />}
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className={clsx("categoryActionsFormPlace")}>
                        { this.showForm() }
                    </div>
                    <div className={"bottomFabs"}>
                        <Fab variant="extended" className={classes.extendedIcon} onClick={this.addImageHandler.bind(this)}>
                            <InsertPhotoIcon />
                            Add image
                        </Fab>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(storeActions.productsActionsScreen()),
        setFieldContent: (field, content) => dispatch(storeActions.changeProductFieldContent(field, content)),
        showMessage: (severity, message) => dispatch(storeActions.setMainMessage(severity, message)),
        closeMessage: () => dispatch(storeActions.hideMainMessage()),
        save: () => dispatch(storeActions.requestProductSave()),
        errorField: (field) => dispatch(storeActions.categoryErrorField(field)),
        addImage: () => dispatch(storeActions.addProductImageElement()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductActionScreen));
