import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import RoundLoading from "./../components/RoundLoading";
import * as storeActions from "./../stores/actions";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}));

const CampaignsPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const application = useSelector(state => state.application);

    const showContent = () => {
        if (application.loading) {
            return (
                <div className={"loadingPageContent"}>
                    <RoundLoading />
                </div>
            );
        }

        return (<p>Campaigns Page</p>);
    };

    return (
        <div className={clsx(classes.root, "page")}>
            <div className={"pageContent"}>
                { showContent() }
            </div>
        </div>
    );
};

export default CampaignsPage;