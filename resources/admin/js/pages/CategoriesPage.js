import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import RoundLoading from "./../components/RoundLoading";
import * as storeActions from "./../stores/actions";
import clsx from "clsx";
import AddIcon from '@material-ui/icons/Add';
import { Fab } from "@material-ui/core";
import { motion } from "framer-motion";
import CategoryActionScreen from "./../screens/CategoryActionScreen";
import CategoryCard from "../components/CategoryCard";
import RemoveCatgoryDialog from "../components/RemoveCatgoryDialog";
import CategoryView from "./../components/category/CategoryView";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

const CategoriesPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const application = useSelector(state => state.application);
    const categories = useSelector(state => state.categories);
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

        if (categories.category?.id > 0) {
            return (
                <CategoryView category={categories.category} />
            );
        }

        if (!(categories.items.length > 0)) {
            return (
                <div className={"emptyList"}>
                    <p>No categories found in database.</p>
                    <p>Please add some categories!</p>
                </div>
            );
        }

        return (
            <div className={"responseList"}>
                { categories.items.map((category, index) => {
                    return (
                        <CategoryCard category={category} key={`cat_${category.id}`} />
                    )
                }) }
            </div>
        );
    };

    const addNewCategory = () => {
        dispatch(storeActions.categoriesActionScreen(true));
        dispatch(storeActions.addFormCategory());
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
                    <Fab aria-label={"Add new category"} color={"primary"} onClick={addNewCategory}>
                        <AddIcon />
                    </Fab>
                </motion.div>
            </div>
            <CategoryActionScreen />
            <RemoveCatgoryDialog />
        </div>
    );
};

export default CategoriesPage;
