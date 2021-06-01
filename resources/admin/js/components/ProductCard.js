import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Fab,
} from "@material-ui/core";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import clsx from "clsx";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import * as storeActions from "./../stores/actions";
import { getProductDefaultImage } from "./../utils/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        minHeight: 200,
        maxHeight: 200,
    },
    actionArea: {
        justifyContent: 'space-between'
    },
}));

const ProductCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const product = props.product;
    const history = useHistory();

    const editHandler = () => {
        dispatch(storeActions.productsActionsScreen(true));
        dispatch(storeActions.editFormProduct(product.id));
    };
    const deleteHandler = () => {
        dispatch(storeActions.productRemoveDialog(true, product.id));
    };
    const openHandler = () => {
        dispatch(storeActions.setApplicationLoading(true));
        history.push(`/admin/product/${product.code}`);
    };

    const showProductImage = () => {
        const image = getProductDefaultImage(product);

        return (
            <CardMedia
                className={clsx(classes.media, "categoryImage")}
                image={image.thumbnail}
                title={image.name}
                component={"img"}
                aria-label={image.name}
            />
        )
    };

    const showCardActions = () => {
        if (props.hideEdit) {
            return <div className={"elementCardActions"}></div>;
        }

        return (
            <CardActions className={clsx(classes.actionArea,"elementCardActions")}>
                <Button startIcon={<EditIcon />} onClick={editHandler}>edit</Button>
                <Button startIcon={<DeleteIcon />} onClick={deleteHandler}>delete</Button>
            </CardActions>
        );
    };

    return (
        <Card className={clsx(classes.root, "shopCard", "elementCard")}>
            { showProductImage() }
            <CardContent className={clsx("shopCardContent","elementCardContent")}>
                <Typography component={"h1"}>{product.name}</Typography>
                <Typography component={"p"}>{parse(product.preview)}</Typography>
                <Fab aria-label={"View product"} color={"secondary"} className={clsx("shopViewButton")} onClick={openHandler}>
                    <FullscreenIcon />
                </Fab>
            </CardContent>
            { showCardActions() }
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    hideEdit: PropTypes.bool,
};

export default ProductCard;
