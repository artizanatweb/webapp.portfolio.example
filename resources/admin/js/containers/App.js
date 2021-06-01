import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import { makeStyles, createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import BlueGreyColor from "@material-ui/core/colors/blueGrey";
import TealColor from "@material-ui/core/colors/teal";
import RedColor from "@material-ui/core/colors/red";
import PurpleColor from "@material-ui/core/colors/purple";
import YellowColor from "@material-ui/core/colors/yellow";
import PinkColor from "@material-ui/core/colors/pink";
import DeepOrangeColor from "@material-ui/core/colors/deepOrange";
import * as storeActions from "./../stores/actions";
import LoginScreen from "./../screens/LoginScreen";
import MainMessage from "./../components/messages/MainMessage";
import MainToolbar from "./../components/MainToolbar";
import Content from "./Content";
import MainMenu from "../components/MainMenu";

function App(props) {
    const dispatch = useDispatch();
    const application = useSelector(state => state.application);

    useEffect(() => {
        setTimeout(() => {
            dispatch(storeActions.showApplication());
        }, 500);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatch(storeActions.authFromStorage());
        }, 100);
    }, []);

    const darkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
            primary: darkMode ? YellowColor : PurpleColor,
            secondary: darkMode ? DeepOrangeColor : PinkColor,
            background: {
                default: darkMode ? "#303030" : "#f5f5f5",
                // default: "#f4f4f7",
            }
        },
    });

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <MainToolbar />
            <div className={"adminApplication"}>
                <Content />
            </div>
            <MainMenu />
            <LoginScreen />
            <MainMessage />
        </MuiThemeProvider>
    );
}

export default App;

