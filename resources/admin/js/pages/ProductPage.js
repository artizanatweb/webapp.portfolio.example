import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RoundLoading from "./../components/RoundLoading";
import * as storeActions from "./../stores/actions";
import clsx from "clsx";
import { Button, Typography, Card, CardMedia, CardActionArea } from "@material-ui/core";
import parse from "html-react-parser";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
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
    },
    card: {
        maxWidth: 174,
    },
    cardMedia: {
        maxHeight: 98,
    }
}));

const ProductPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const storeProduct = useSelector( state => state.product );
    const application = useSelector(state => state.application);
    const history = useHistory();

    const { match: {params} } = props;

    const pageObject = {
        name: "Product details",
        code: "product",
        api: `/admin/api/product/${params.code}`,
    };

    useEffect(() => {
        dispatch(storeActions.setActualPage(pageObject));
        dispatch(storeActions.requestPageContent(pageObject));

        return () => {
            dispatch(storeActions.setProductData(null));
        }
    }, []);

    const backHandler = () => {
        history.push('/admin/products');
    };

    const imageHandler = (imageObject) => {
        dispatch(storeActions.setProductMainImage(imageObject));
    };

    const listProductImages = () => {
        if (!storeProduct.data) {
            return null;
        }

        if (!storeProduct.data.images) {
            return null;
        }

        if (!(storeProduct.data.images?.length > 1)) {
            return null;
        }

        const thumbnailCards = [];
        storeProduct.data.images.forEach((imageObject, index) => {
            let element = (
                <Card className={clsx(classes.card, "imageThumbnailCard")} key={`thumbnailCard_${index}_${imageObject.id}`}>
                    <CardActionArea>
                        <CardMedia
                            component={"img"}
                            alt={imageObject.name}
                            title={imageObject.name}
                            image={imageObject.thumbnail}
                            onClick={() => {imageHandler(imageObject);}}
                            className={classes.cardMedia}
                        />
                    </CardActionArea>
                </Card>
            );
            thumbnailCards.push(element)
        });

        return (
            <div className={"viewPageImagesList"}>{ thumbnailCards }</div>
        );
    };

    const showContent = () => {
        if (application.loading) {
            return (
                <div className={"loadingPageContent"}>
                    <RoundLoading />
                </div>
            );
        }

        if (!storeProduct.data) {
            return (
                <div className={"loadingPageContent"}>
                    <RoundLoading />
                </div>
            );
        }

        let imageElement = null;
        if (storeProduct.image) {
            imageElement = (
                <div className={"viewPageBigImage"}>
                    <img src={storeProduct.image.image} />
                </div>
            );
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
                { imageElement }
                { listProductImages() }
                <div className={clsx("viewPageTitle", classes.title)}>
                    <Typography component={"h1"}>{storeProduct.data.name}</Typography>
                    <Typography component={"p"}>Price: <b>{storeProduct.data.price}</b></Typography>
                </div>
                <div className={clsx(classes.description, "viewPageDescription")}>{parse(storeProduct.data.description)}</div>
            </div>
        );
    };

    return (
        <div className={clsx(classes.root, "page")}>
            <div className={"pageContent"}>
                { showContent() }
            </div>
        </div>
    );
};

export default ProductPage;
