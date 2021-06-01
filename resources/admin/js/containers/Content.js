import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Pages from "./../utils/Pages";
import clsx from "clsx";
import * as storeActions from "../stores/actions";
import ProductPage from "./../pages/ProductPage";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
});


class Content extends Component {
    constructor(props) {
        super(props);

        this.routes = [];

        let pages = Pages.getPages();
        pages.forEach((page) => {
            let exact = true;
            if ('projects' === page.code) {
                exact = false;
            }

            if ('campaigns' === page.code) {
                exact = false;
            }

            let route = <Route path={page.paths} exact={exact} key={page.key} component={page.component} />;
            this.routes.push(route);
        });

        let productRoute = <Route path={['/admin/product/:code?']} exact={true} key={"product_page_route"} component={ProductPage} />;
        this.routes.push(productRoute);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.authentication.user) {
            return;
        }

        let actualPage = Pages.getByPathname(this.props.location.pathname);
        if (actualPage && actualPage.code === this.props.application.page?.code) {
            return;
        }

        if (!actualPage) {
            return;
        }

        this.props.requestContent(actualPage);
    }

    render() {
        let classes = this.props.classes;

        if (!this.props.authentication.user) {
            return null;
        }

        return (
            <Container>
                <div className={"content"} id={"content"}>
                    <div className={"pagesSupport"}>
                        <div className={classes.offset}></div>
                        <Switch location={this.props.location} key={this.props.location.key}>
                            {this.routes}
                        </Switch>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        authentication: state.authentication,
        application: state.application,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        requestContent: (page) => {
            dispatch(storeActions.setActualPage(page));
            dispatch(storeActions.requestPageContent(page));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Content)));
