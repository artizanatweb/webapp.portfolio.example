import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton
} from '@material-ui/core';
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logo from "./Logo";
import * as storeActions from "./../stores/actions";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        backgroundColor: theme.palette.primary.dark,
        // backgroundColor: theme.palette.secondary.main,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
    logoutButton: {
        marginLeft: theme.spacing(2),
    },
}));

const MainToolbar = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const authentication = useSelector(state => state.authentication);
    const application = useSelector(state => state.application);

    if (!authentication.user) {
        return null;
    }

    const openMainMenu = () => {
        dispatch(storeActions.openMainMenu(true));
    };

    const logoutUser = () => {
        dispatch(storeActions.logoutAuthUser());
    };

    return (
        <div className={clsx(classes.root, "mainToolbar")}>
            <AppBar position={"sticky"} className={classes.toolbar}>
                <Toolbar>
                    <IconButton edge={"start"} className={classes.menuButton} color={"inherit"}  aria-label={"menu"} onClick={openMainMenu}>
                        <MenuIcon />
                    </IconButton>
                    <div className={clsx(classes.title, "logoAndName")}>
                        <Typography component={"h6"}>{ application.page?.name }</Typography>
                    </div>
                    <IconButton edge={"end"} className={classes.logoutButton} color={"inherit"}  aria-label={"logout"} onClick={logoutUser}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default MainToolbar;