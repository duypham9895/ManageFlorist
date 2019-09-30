import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/login"
                    render={props => <LoginPage {...props} />}
                />
                <Route
                    path="/register"
                    render={props => <RegisterPage {...props} />}
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
