import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import RoundLoading from "./../components/RoundLoading";
import * as storeActions from "./../stores/actions";
import clsx from "clsx";
import AddIcon from '@material-ui/icons/Add';
import { Fab } from "@material-ui/core";
import { motion } from "framer-motion";
import ProductActionScreen from "./../screens/ProductActionScreen";
import ProductCard from "../components/ProductCard";
import RemoveProductDialog from "../components/RemoveProductDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const ProductsPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const application = useSelector(state => state.application);
    const products = useSelector(state => state.products);
    const { match: {params} } = props;

    useEffect(() => {
        if ("view" === params.action) {
            if (params.id > 0) {
                return dispatch(storeActions.requestCategory(params.id));
            }
        }

        dispatch(storeActions.setCategory(null));
    }, []);

    const showContent = () => {
        if (application.loading) {
            return (
                <div className={"loadingPageContent"}>
                    <RoundLoading />
                </div>
            );
        }

        if (!(products.items?.length > 0)) {
            return (
                <div className={"emptyList"}>
                    <p>No products found in database.</p>
                    <p>Please add some products!</p>
                </div>
            );
        }

        return (
            <div className={"responseList"}>
                { products.items.map((product, index) => {
                    return (
                        <ProductCard product={product} key={`prod_${product.id}`} />
                    )
                }) }
            </div>
        );
    };

    const addNewProduct = () => {
        dispatch(storeActions.productsActionsScreen(true));
        dispatch(storeActions.addFormProduct());
    };

    const addButtonVariants = {
        initial: {
            y: 100,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {delay: 0.5}
        }
    };

    return (
        <div className={clsx(classes.root, "page")}>
            <div className={"pageContent"}>
                { showContent() }
                <motion.div
                    variants={addButtonVariants}
                    initial={"initial"}
                    animate={(params.action) ? "initial" : "animate"}
                    exit={"initial"}
                    className={"pageAddButton"}
                >
                    <Fab aria-label={"Add new category"} color={"primary"} onClick={addNewProduct}>
                        <AddIcon />
                    </Fab>
                </motion.div>
            </div>
            <ProductActionScreen />
            <RemoveProductDialog />
        </div>
    );
};

export default ProductsPage;
