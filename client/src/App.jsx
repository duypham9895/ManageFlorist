import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Category from "./components/category/Category.jsx";

import Routes from "./components/routing/Routes";
class App extends React.Component {
    render() {
        return (
            <Fragment>
                {/* <Route exact path="/" component={LoginPage} />
                    <Route component={Routes} /> */}
                {/* render={ (props) => <Category {...props} />  */}
                <Route
                    exact
                    path="/"
                    render={props => <LoginPage {...props} />}
                />

                <Route
                    exact
                    path="/login"
                    render={props => <LoginPage {...props} />}
                />
                <Route
                    exact
                    path="/register"
                    render={props => <Register {...props} />}
                />
                <Route
                    path="/dashboard"
                    render={props => <Dashboard {...props} />}
                />
            </Fragment>
        );
    }
}

export default App;
