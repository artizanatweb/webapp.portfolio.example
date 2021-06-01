import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import * as storeActions from "./../../stores/actions";
import CategoryProductsDialog from "./CategoryProductsDialog";
import CategoryProductItem from "./CategoryProductItem";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
});

class CategoryProducts extends Component {
    productsList() {
        if (!this.props.categories.form) {
            return null;
        }

        let categoryProducts = [];
        if (this.props.categories.form?.products) {
            categoryProducts = this.props.categories.form.products;
        }

        const productElements = [];

        if (!(categoryProducts?.length > 0)) {
            let emptyElement = (
                <div className={"emptyElement"} key={"empty-product-element"}>
                    <p>Category has no products assigned.</p>
                </div>
            );

            productElements.push(emptyElement);
            return productElements;
        }

        // loop form products and add them to productElements
        categoryProducts.forEach((product) => {
            let productItem = <CategoryProductItem product={product} key={`spl_${product.id}`} />;
            productElements.push(productItem);
        });

        return (
            <div className={"productsList"}>{ productElements }</div>
        );
    }

    openDialogHandler() {
        if (this.props.categoryProducts.openDialog) {
            return;
        }

        this.props.openAssignDialog();
    }

    removeButton() {
        if (!(this.props.categoryProducts.removeAssigned?.length > 0)) {
            return null;
        }

        return (
            <Button
                size={"large"}
                variant={"contained"}
                color={"primary"}
                className={"removeAssignedProjects"}
                startIcon={<RemoveCircleIcon />}
                onClick={ this.props.removeAssigned }
            >
                remove projects
            </Button>
        );
    }

    render() {
        return (
            <div className={"productsAreaSupport"}>
                <div className={"buttonsArea"}>
                    <Button
                        size={"large"}
                        variant={"contained"}
                        color={"default"}
                        className={"openAssignList"}
                        startIcon={<AddCircleIcon />}
                        onClick={ this.openDialogHandler.bind(this) }
                    >
                        assign products
                    </Button>
                    { this.removeButton() }
                </div>
                <div className={"listArea"}>
                    { this.productsList() }
                </div>
                <CategoryProductsDialog />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        categoryProducts: state.categoryProducts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openAssignDialog: () => dispatch(storeActions.openCategoryProductsAssignDialog()),
        removeAssigned: () => dispatch(storeActions.removeAssignedProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryProducts));
