import React, { Component } from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import { Theme } from "../styles";
import history from "../history";
import Category from "./Category";
import Four_not_four from "./404";
import Layout from "./Layout";

export default class InventoryPortal extends Component {
    render() {
        return (
            <ThemeProvider theme={Theme}>
                <BrowserRouter>
                    <Layout>
                        <Switch history={history}>
                            <Route exact path="/" component={Category}/>
                            <Route path="/" component={Four_not_four} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}