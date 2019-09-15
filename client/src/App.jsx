import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";

class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/login"
                    render={props => <LoginPage {...props} />}
                />
            </Fragment>
        );
    }
}

export default App;
