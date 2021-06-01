import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, NavLink, Route } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import * as storeActions from "./../stores/actions";
import Pages from "./../utils/Pages";
import clsx from 'clsx';
import Logo from "./Logo";

const styles = theme => ({
    root: {
        // backgroundColor: theme.palette.primary[700],
        // color: '#ffffff',
    },
    list: {
        minWidth: 260,
    },
    fullList: {
        width: 'auto',
    },
    icon: {
        fill: '#ffffff',
    },
    offset: theme.mixins.toolbar,
});

class MainMenu extends Component {
    constructor(props) {
        super(props);

        this.escHandler = this.escHandler.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escHandler, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.escHandler, false);
    }

    escHandler(event) {
        if (!this.props.menu.open) {
            return;
        }

        if (!(27 === event.keyCode)) {
            return;
        }

        this.props.close();
    }

    clickHandler(page, evt) {
        let actualPage = Pages.getByPathname(this.props.location.pathname);
        if (actualPage && page.code === actualPage.code) {
            return;
        }

        this.props.clearPage();

        let pageUrl = page.paths[0];
        if (page.paths.length > 1) {
            pageUrl = page.paths[1];
        }

        this.props.history.push(pageUrl);
    }

    render() {
        let classes = this.props.classes;

        let actualPage = Pages.getByPathname(this.props.location.pathname);

        let buttons = [];
        let pages = Pages.getPages();
        pages.forEach((page) => {
            let selected = false;
            if (actualPage && page.code === actualPage.code) {
                selected = true;
            }

            let button = (
                <ListItem button key={`menu_button_${page.code}`} onClick={this.clickHandler.bind(this, page)} selected={selected}>
                    <ListItemIcon className={clsx(classes.icon,"pageIcon")}>{page.icon}</ListItemIcon>
                    <ListItemText primary={page.name} />
                </ListItem>
            );
            buttons.push(button);
        });

        return (
            <div className={"mainMenuSupport"}>
                <Drawer anchor={'left'} open={this.props.menu.open} onClose={this.props.close} classes={{ paper: classes.root}}>
                    <div className={clsx(classes.list, classes.fullList)}
                         role={"presentation"}
                         onClick={this.props.close}
                         onKeyDown={this.props.close}>
                        <div className={clsx(classes.offset, "menuLogo")}>
                            <Logo />
                            <Typography component={"h6"}>
                                WEBAPP
                                <span>Manager</span>
                            </Typography>
                        </div>
                        <List>
                            {buttons}
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        menu: state.menu,
        authentication: state.authentication,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(storeActions.openMainMenu(false)),
        clearPage: () => {
            dispatch(storeActions.setApplicationLoading(true));
            // dispatch(storeActions.resetPage());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(MainMenu)));
