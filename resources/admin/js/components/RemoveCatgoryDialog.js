import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
    Button,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import * as storeActions from "./../stores/actions";
import RoundLoading from "./RoundLoading";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

class RemoveCatgoryDialog extends Component {
    closeHandler(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        if (!this.props.categories.deleteDialog) {
            return;
        }

        if (this.props.categories.removing) {
            return;
        }

        this.props.close();
    }

    deleteHandler() {
        if (!this.props.categories.deleteDialog) {
            return;
        }

        if (this.props.categories.removing) {
            return;
        }

        this.props.delete();
    }

    showDialogContent() {
        const loadingComponent = (
            <DialogContent dividers className={"removeDialogContent"}>
                <RoundLoading />
            </DialogContent>
        );

        if (this.props.categories.removing) {
            return loadingComponent;
        }

        if (!(this.props.categories.deleteId > 0)) {
            return loadingComponent;
        }

        let category = this.props.categories.items.find( cat => cat.id === this.props.categories.deleteId );
        if (!category) {
            return loadingComponent;
        }

        return (
            <DialogContent dividers className={"removeDialogContent"}>
                <div className={"rdcElement"}>
                    <img src={category.thumbnail} />
                </div>
                <div className={"rdcElement"}>
                    <Typography component={'h1'} gutterBottom>{category.name}</Typography>
                    <Typography gutterBottom>{category.preview}</Typography>
                </div>
            </DialogContent>
        );
    }

    render() {
        let classes = this.props.classes;

        return (
            <Dialog onClose={this.closeHandler.bind(this)} aria-labelledby="remove-company-dialog" open={this.props.categories.deleteDialog}>
                <DialogTitle id="customized-dialog-title" onClose={this.closeHandler.bind(this)}>
                    <Typography>Remove category</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.closeHandler.bind(this)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                { this.showDialogContent() }
                <DialogActions>
                    <Button onClick={this.deleteHandler.bind(this)}
                            color="primary"
                            startIcon={<DeleteIcon />}>
                        Remove
                    </Button>
                    <Button
                        autoFocus
                        onClick={this.closeHandler.bind(this)}
                        startIcon={<CancelIcon />}
                        color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
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
        close: () => dispatch(storeActions.closeCategoryDeleteDialog()),
        delete: () => dispatch(storeActions.requestCategoryRemoval()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RemoveCatgoryDialog));
