import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button, Typography } from "@material-ui/core";
import clsx from "clsx";
import parse from "html-react-parser";
import ProductCard from "./../ProductCard";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        marginLeft: 0,
    },
    title: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    description: {
        paddingTop: 0,
        paddingBottom: theme.spacing(1),
    }
}));

const CategoryView = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const backHandler = () => {
        history.push('/admin/categories');
    };

    const category = props.category;

    const listProducts = () => {
        if (!category.products) {
            return null;
        }

        return (
            <div className={"responseList"}>
                { category.products.map((product, index) => {
                    return (
                        <ProductCard product={product} hideEdit={true} key={`prod_${product.id}`} />
                    )
                }) }
            </div>
        );
    };

    let nrProducts = 0;
    if (category.products && category.products.length > 0) {
        nrProducts = category.products.length;
    }

    return (
        <div className={"viewPage"}>
            <div className={"viewPageToolbar"}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    className={classes.button}
                    onClick={backHandler}
                >Back</Button>
            </div>
            <div className={"viewPageBigImage"}>
                <img src={category.image} />
            </div>
            <div className={clsx("viewPageTitle", classes.title)}>
                <Typography component={"h1"}>{category.name}</Typography>
                <Typography component={"p"}><b>{nrProducts}</b> Products</Typography>
            </div>
            <div className={clsx(classes.description, "viewPageDescription")}>{parse(category.description)}</div>
            <div className={"viewPageListTitle"}>
                <Typography component={"h1"}>Category products</Typography>
            </div>
            <div className={"viewPageListItems"}>
                { listProducts() }
            </div>
        </div>
    );
};

CategoryView.propTypes = {
    category: PropTypes.object.isRequired,
};

export default CategoryView;
