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
import CategoryProducts from "./../components/category/CategoryProducts";

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

class CategoryActionScreen extends Component {
    constructor(props) {
        super(props);

        this.refFields = {
            name: createRef(),
            position: createRef(),
            preview: createRef(),
        };
        this.focused = false;
        this.focusTimer = 0;

        this.inputFileRef = createRef();
        this.chooseFileRef = createRef();

        this.editor = null;

        this.allowedTypes = ['image/png', 'image/jpeg'];
    }

    isError(field) {
        if (!field) {
            return false;
        }

        if (field === this.props.categories.errorField) {
            if ('file' != field) {
                this.focusField(field);
            }

            return true;
        }
        return false;
    }

    focusField(field) {
        if (!field) {
            return;
        }

        if ('description' === field) {
            return this.focusEditor();
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
        if (!this.props.categories.actionsScreen) {
            if (this.focused) {
                this.focused = false;
            }

            return;
        }

        if (!this.props.categories.form) {
            return;
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
        if (this.props.categories.saving) {
            return;
        }

        this.props.close();
    }

    saveHandler() {
        if (this.props.categories.saving) {
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

    inputFileHandler(event) {
        const files = this.inputFileRef.current.files;

        Object.keys(files).forEach((attr) => {
            const uFile = files[attr];

            if (uFile.size > process.env.MIX_MAX_FILE_SIZE) {
                this.props.showMessage('error', `File size is to big!`);
                this.props.errorField('file');
                return;
            }

            if (!this.allowedTypes.includes(uFile.type)) {
                this.props.showMessage('error', `File type "${uFile.type}" is not allowed!`);
                return;
            }

            this.props.closeMessage();

            const reader = new FileReader();
            reader.onload = (evt) => {
                this.props.setImageFile(uFile, evt.target);
            };
            reader.onabort = (evt) => {
                this.props.showMessage('error', `Error encountered! Please try another file.`);
            };

            reader.readAsDataURL(uFile);
        });
    }

    showForm() {
        if (!this.props.categories.form) {
            return <RoundLoading />;
        }

        return (
            <form noValidate autoComplete={"off"} className={"actionScreenForm"}>
                <FormControl className="formRow">
                    <TextField className={this.props.classes.field} label="Code" value={this.props.categories.form.code} />
                    <FormHelperText error={false}>Unique code for this category.</FormHelperText>
                </FormControl>
                <FormControl className="formRow" error={this.isError('name')}>
                    <TextField inputRef={this.refFields.name} className={this.props.classes.field} label="Name" value={this.props.categories.form.name} onChange={this.fieldChanged.bind(this, 'name')} />
                    <FormHelperText>Name of this category.</FormHelperText>
                </FormControl>
                <FormControl className="formRow" error={this.isError('position')}>
                    <TextField
                        className={this.props.classes.field}
                        label="Position"
                        value={this.props.categories.form.position}
                        onChange={this.fieldChanged.bind(this, 'position')}
                        type="number"
                        inputRef={this.refFields.position}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormHelperText error={false}>Position occupied by this category.</FormHelperText>
                </FormControl>
                <FormControl className="formRow" error={this.isError('file')}>
                    <FormHelperText>Category image. Only .png, .jpg and .jpeg files accepted</FormHelperText>
                    <label htmlFor={"btn-upload"} className={"fileUploadSupport"}>
                        <input type={"file"} ref={this.inputFileRef} style={{ display: "none" }} id={"btn-upload"} onChange={this.inputFileHandler.bind(this)} />
                        <Button ref={this.chooseFileRef} component={"span"} variant={"outlined"} className={"btn-choose"}>Choose file</Button>
                        <div className={"fileHoler"} style={{ backgroundImage: `url(${this.props.categories.form.imageReader.result})` }}></div>
                    </label>
                </FormControl>
                <FormControl className="formRow" error={this.isError('preview')}>
                    <TextField
                        className={this.props.classes.field}
                        label="Preview text"
                        value={this.props.categories.form.preview}
                        onChange={this.fieldChanged.bind(this, 'preview')}
                        multiline
                        rows={5}
                        rowsMax={10}
                        inputRef={this.refFields.preview}
                    />
                    <FormHelperText>Preview text for this category.</FormHelperText>
                </FormControl>
                <FormControl className="formRow textEditorRow">
                    <Typography className={clsx("MuiFormLabel-root", "editorLabel")}>Category description:</Typography>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.props.categories.form.description}
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
                    <FormHelperText error={this.isError('description')}>Category full description.</FormHelperText>
                </FormControl>
                <FormControl className={"formRow productsAreaRow"}>
                    <CategoryProducts />
                </FormControl>
            </form>
        );
    }

    render() {
        const classes = this.props.classes;

        let dialogTitle = "Add new category";
        if (this.props.categories.form?.id > 0) {
            dialogTitle = `Edit category`;
        }

        const buttonClassname = clsx({
            [this.props.classes.buttonSuccess]: this.props.categories.saved,
            [this.props.classes.buttonSave]: !this.props.categories.saved,
        });

        return (
            <div className={"categoryActionScreen"}>
                <Dialog fullScreen={true} open={ this.props.categories.actionsScreen } TransitionComponent={ Trasition } onClose={this.closeHandler.bind(this)} className={"categoryActionsDialog"}>
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
                                    { this.props.categories.saved ? <CheckIcon /> : <SaveIcon /> }
                                </Fab>
                                {this.props.categories.saving && <CircularProgress size={68} className={classes.fabProgress} />}
                            </div>
                        </Toolbar>
                    </AppBar>
                    <div className={clsx("categoryActionsFormPlace")}>
                        { this.showForm() }
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(storeActions.categoriesActionScreen()),
        setFieldContent: (field, content) => dispatch(storeActions.changeCategoryFieldContent(field, content)),
        showMessage: (severity, message) => dispatch(storeActions.setMainMessage(severity, message)),
        closeMessage: () => dispatch(storeActions.hideMainMessage()),
        setImageFile: (file, reader) => dispatch(storeActions.categoryFileImage(file, reader)),
        save: () => dispatch(storeActions.requestCategorySave()),
        errorField: (field) => dispatch(storeActions.categoryErrorField(field)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryActionScreen));
