import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
// import Register from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
class App extends React.Component {
    render() {
        return (
            <Fragment>
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
                {/* <Route
                    exact
                    path="/register"
                    render={props => <Register {...props} />}
                /> */}
                <Route
                    path="/dashboard"
                    render={props => <Dashboard {...props} />}
                />
            </Fragment>
        );
    }
}

export default App;
