import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
    Paper,
    FormControl,
    TextField,
    FormHelperText,
    Typography,
    Button,
    FormControlLabel,
    Switch,
} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import * as storeActions from "./../../stores/actions";
import PropTypes from "prop-types";
import CategoryCard from "../CategoryCard";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    field: {
        width: '100%',
    },
});

class ImageElement extends Component {
    constructor(props) {
        super(props);

        this.inputFileRef = createRef();

        this.allowedTypes = ['image/png', 'image/jpeg'];

        this.fieldsRef = {
            name: createRef(),
            description: createRef(),
        };

        this.focusTimer = 0;
    }

    isErrorField(field) {
        if (!this.props.products.formImageErrors) {
            return false;
        }

        if (!this.props.products.formImageErrors.hasOwnProperty(this.props.image.assetKey)) {
            return false;
        }

        if (!(field === this.props.products.formImageErrors[this.props.image.assetKey])) {
            return false;
        }

        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.products.actionsScreen) {
            return;
        }

        if (!this.props.products.formImageErrors) {
            return;
        }

        if (!this.props.products.formImageErrors.hasOwnProperty(this.props.image.assetKey)) {
            return;
        }

        this.focusField(this.props.products.formImageErrors[this.props.image.assetKey]);
    }

    removeHandler() {
        this.props.remove(this.props.image);
    }

    fieldValueHandler(field, event) {
        let value = event.target.value;
        this.props.fieldValue(field, value, this.props.image);
    }

    defaultHandler(event) {
        let checked = event.target.checked;
        let value = false;
        if (checked) {
            value = true;
        }

        this.props.fieldValue('default', value, this.props.image);
    }

    inputFileHandler(event) {
        const files = this.inputFileRef.current.files;

        Object.keys(files).forEach((attr) => {
            const uFile = files[attr];
            if (uFile.size > process.env.MIX_MAX_FILE_SIZE) {
                this.props.showMessage('error', `File size is to big!`);
                return;
            }

            if (!this.allowedTypes.includes(uFile.type)) {
                this.props.showMessage('error', `File type "${uFile.type}" is not allowed!`);
                return;
            }

            this.props.closeMessage();

            const reader = new FileReader();
            reader.onload = (evt) => {
                this.props.setImageFile(uFile, evt.target, this.props.image);
            };
            reader.onabort = (evt) => {
                this.props.showMessage('error', `Error encountered! Please try another file.`);
            };

            reader.readAsDataURL(uFile);
        });
    }

    focusField(field) {
        console.log(field);
        if (!field) {
            return;
        }

        clearTimeout(this.focusTimer);
        this.focusTimer = setTimeout(() => {
            this.fieldsRef[field].current.focus();
        }, 500);
    }

    render() {
        let refElement = null;
        const {forwardedRef, ...rest} = this.props;
        if (forwardedRef && forwardedRef.hasOwnProperty('current')) {
            refElement = <div ref={forwardedRef} className={"listRefElement"} />;
        }

        let defaultImage = false;
        if (true === this.props.image.default) {
            defaultImage = true;
        }



        return (
            <div className={"imageElementSupport"}>
                { refElement }
                <Paper>
                    <div className={"imageElementHeader"}>
                        <Typography>Product image</Typography>
                        <Button endIcon={<DeleteForeverIcon />} onClick={this.removeHandler.bind(this)}>remove</Button>
                    </div>
                    <FormControl className="formRow">
                        <label htmlFor={`btn-upload-p${this.props.elementIndex}`} className={"fileUploadSupport"}>
                            <input type={"file"} ref={this.inputFileRef} style={{ display: "none" }} id={`btn-upload-p${this.props.elementIndex}`} onChange={this.inputFileHandler.bind(this)} />
                            <Button component={"span"} variant={"outlined"} className={"btn-choose"}>Choose file</Button>
                            <div className={"fileHoler"} style={{ backgroundImage: `url(${this.props.image.imageReader.result})` }}></div>
                        </label>
                    </FormControl>
                    <FormControl className="formRow" error={this.isErrorField('name')}>
                        <TextField className={this.props.classes.field} label="Name" value={this.props.image.name} onChange={this.fieldValueHandler.bind(this, 'name')} inputRef={this.fieldsRef.name} />
                        <FormHelperText>Image name.</FormHelperText>
                    </FormControl>
                    <FormControl className="formRow" error={this.isErrorField('description')}>
                        <TextField className={this.props.classes.field} label="Description" value={this.props.image.description} multiline rows={3} onChange={this.fieldValueHandler.bind(this, 'description')} inputRef={this.fieldsRef.description} />
                        <FormHelperText>Image description.</FormHelperText>
                    </FormControl>
                    <FormControl className={clsx("formRow", "switchRow")}>
                        <FormControlLabel className="defaultSwitch" control={
                            <Switch
                                checked={defaultImage}
                                onChange={this.defaultHandler.bind(this)}
                                name={"default"}
                                color={"primary"}
                            />
                        } label={"Default image"} labelPlacement={"start"} />
                    </FormControl>
                </Paper>
            </div>
        );
    }
}

ImageElement.propTypes = {
    image: PropTypes.object.isRequired,
    elementIndex: PropTypes.number.isRequired,
    forwardedRef: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        products: state.products,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        remove: (obj) => dispatch(storeActions.removeProductImageElement(obj)),
        fieldValue: (field, value, obj) => dispatch(storeActions.changeImageField(field, value, obj)),
        showMessage: (severity, message) => dispatch(storeActions.setMainMessage(severity, message)),
        closeMessage: () => dispatch(storeActions.hideMainMessage()),
        setImageFile: (file, reader, imageObject) => dispatch(storeActions.addProductFileImage(file, reader, imageObject)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ImageElement));
