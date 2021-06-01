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

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        minHeight: 200,
    },
    actionArea: {
        justifyContent: 'space-between'
    },
}));

const CategoryCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const category = props.category;
    const history = useHistory();

    const editHandler = () => {
        dispatch(storeActions.categoriesActionScreen(true));
        dispatch(storeActions.editFormCategory(category.id));
    };
    const deleteHandler = () => {
        dispatch(storeActions.openCategoryDeleteDialog(category.id));
    };
    const openHandler = () => {
        dispatch(storeActions.setApplicationLoading(true));
        history.push(`/admin/categories/view/${category.id}`);
    };

    return (
        <Card className={clsx(classes.root, "shopCard", "elementCard")}>
            <CardMedia
                className={clsx(classes.media, "categoryImage")}
                image={category.thumbnail}
                title={category.name}
                component={"img"}
            />
            <CardContent className={clsx("shopCardContent","elementCardContent")}>
                <Typography component={"h1"}>{category.name}</Typography>
                <Typography component={"p"}>{parse(category.preview)}</Typography>
                <Fab aria-label={"View category"} color={"secondary"} className={clsx("shopViewButton")} onClick={openHandler}>
                    <FullscreenIcon />
                </Fab>
            </CardContent>
            <CardActions className={clsx(classes.actionArea,"elementCardActions")}>
                <Button startIcon={<EditIcon />} onClick={editHandler}>edit</Button>
                <Button startIcon={<DeleteIcon />} onClick={deleteHandler}>delete</Button>
            </CardActions>
        </Card>
    );
};

CategoryCard.propTypes = {
    category: PropTypes.object.isRequired,
};

export default CategoryCard;
