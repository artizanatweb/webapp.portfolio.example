import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card, CardContent, CardMedia,
    Typography
} from '@material-ui/core';
import PropTypes from "prop-types";
import * as storeActions from "./../../stores/actions";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
    },
    selected: {
        backgroundColor: theme.palette.secondary.light,
    }
}));

const CategoryProductCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categoryProducts = useSelector(state => state.categoryProducts);

    let product = categoryProducts.products.find(prod => props.productId === prod.id);

    let checkIcon = <RadioButtonUncheckedIcon />;
    let contentClassName = classes.content;
    if (categoryProducts.selected.includes(props.productId)) {
        contentClassName = clsx(classes.content, classes.selected);
        checkIcon = <CheckCircleIcon />;
    }

    const selectHandler = () => {
        dispatch(storeActions.selectDialogProduct(props.productId));
    };

    let defaultImage = getProductDefaultImage(product);

    return (
        <Card className={classes.root} onClick={selectHandler}>
            <CardMedia
                className={classes.cover}
                image={defaultImage.thumbnail}
                title={defaultImage.name}
            />
            <CardContent className={contentClassName}>
                <div>
                    <Typography component={"h2"}>{product.name}</Typography>
                    <Typography component={"p"}>Price: <b>{product.price}</b></Typography>
                </div>
                { checkIcon }
            </CardContent>
        </Card>
    );
};

CategoryProductCard.propTypes = {
    productId: PropTypes.number.isRequired,
};

export default CategoryProductCard;
