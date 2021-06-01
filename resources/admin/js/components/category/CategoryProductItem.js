import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card, CardContent, CardMedia,
    Typography
} from '@material-ui/core';
import PropTypes from "prop-types";
import * as storeActions from "./../../stores/actions";
import clsx from "clsx";
import { getProductDefaultImage } from "./../../utils/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        cursor: 'pointer',
    },
    cover: {
        width: 100,
    },
    content: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'column',
        flex: 1,
    },
    selected: {
        backgroundColor: theme.palette.primary.dark,
    }
}));

const CategoryProductItem = (props) => {
    const classes = useStyles();
    const selected = useSelector(state => state.categoryProducts.removeAssigned);
    const dispatch = useDispatch();

    const product = props.product;

    let contentClassName = classes.content;
    if (selected.includes(product.id)) {
        contentClassName = clsx(classes.content, classes.selected);
    }

    const selectHandler = () => {
        dispatch(storeActions.selectAssignedProduct(product.id));
    };

    const defaultImage = getProductDefaultImage(product);

    return (
        <Card className={classes.root} onClick={selectHandler}>
            <CardMedia
                className={classes.cover}
                image={defaultImage.thumbnail}
                title={defaultImage.name}
            />
            <CardContent className={contentClassName}>
                <Typography component={"h2"}>{product.name}</Typography>
                <Typography component={"p"}>Price: <b>{product.price}</b></Typography>
            </CardContent>
        </Card>
    );
};

CategoryProductItem.propTypes = {
    product: PropTypes.object.isRequired,
};

export default CategoryProductItem;
