import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
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
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from "@material-ui/icons/Close";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import RoundLoading from "./../RoundLoading";
import * as storeActions from "./../../stores/actions";
import clsx from "clsx";
import CategoryProductCard from "./CategoryProductCard";

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

class CategoryProductsDialog extends Component {
    closeHandler() {
        this.props.close();
    }

    showContent() {
        if (!this.props.categoryProducts.products) {
            return <div className={'loadingProducts'}><RoundLoading /></div>;
        }

        if (!(this.props.categoryProducts.products?.length > 0)) {
            return <div className={'loadingProducts'}><p>No new products found!</p></div>;
        }

        const productElements = [];
        this.props.categoryProducts.products.forEach((product, index) => {
            let productCard = <CategoryProductCard productId={product.id} key={`cpd-${product.code}`} />;
            productElements.push(productCard);
        });

        return (
            <div className={"productsSelectList"}>{productElements}</div>
        );
    }

    addButton() {
        if (!(this.props.categoryProducts.selected.length > 0)) {
            return null;
        }

        let productText = 'product';
        if (this.props.categoryProducts.selected.length > 1) {
            productText = 'products';
        }

        let buttonText = `Assign ${this.props.categoryProducts.selected.length} ${productText}`;

        return (
            <Button
                autoFocus
                onClick={this.assignProjects.bind(this)}
                startIcon={<DoneAllIcon />}
                color="default"
            >
                {buttonText}
            </Button>
        );
    }

    assignProjects() {
        this.props.assign();
    }

    render() {
        const classes = this.props.classes;

        return (
            <Dialog onClose={this.closeHandler.bind(this)} aria-labelledby="projects-dialog" open={this.props.categoryProducts.openDialog} className={"categoryProductsDialog"}>
                <DialogTitle className={"productsListTitle"} onClose={this.closeHandler.bind(this)} disableTypography={true}>
                    <Typography component={"h1"}>Assign products to category</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.closeHandler.bind(this)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers className={"productsListContent"}>
                    { this.showContent() }
                </DialogContent>
                <DialogActions className={"productsListActions"}>
                    <Button
                        autoFocus
                        onClick={this.closeHandler.bind(this)}
                        startIcon={<CancelIcon />}
                        color="secondary"
                    >
                        Close
                    </Button>
                    { this.addButton() }
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {
        categoryProducts: state.categoryProducts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(storeActions.closeCategoryProductsAssignDialog()),
        assign: () => dispatch(storeActions.assignCategoryProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryProductsDialog));
