import React, { Component } from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import { Theme } from "../styles";
import history from "../history";
import Category from "./Category";
import Four_not_four from "./404";
import Layout from "./Layout";
const { improbRPC } = require("reactrpc");
const messages = require("../proto/inventory_service_pb.js");
const services = require("../proto/inventory_service_pb_service");

const URL = "http://" + window.location.hostname + ":8080"
improbRPC.build(messages, services, URL)


class InventoryPortal extends Component {
    render() {
        return (
            <ThemeProvider theme={Theme}>
                <BrowserRouter>
                    <Layout>
                        <Switch history={history}>
                            {/*<Route exact path="/" component={Category}/>*/}
                            <Route exact path="/" render={(props) => <Category InventoryService={this.props.InventoryService} {...props} />}/>
                            <Route path="/" component={Four_not_four} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        );
    }
}

export default improbRPC.wrapper(InventoryPortal);