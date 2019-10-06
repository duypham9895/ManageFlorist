import React from "react";
import { Route, Switch } from "react-router-dom";

// Component
import Login from "../../pages/LoginPage.jsx";
import Register from "../../pages/RegisterPage.jsx";
import Dashboard from "../../pages/Dashboard";
import Category from "../category/Category.jsx";

import PrivateRoute from "../routing/PrivateRoute";

const Routes = () => {
    return (
        <section>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                {/* <PrivateRoute
                    exact
                    path="/dashboard/category"
                    component={Category}
                /> */}
            </Switch>
        </section>
    );
};

export default Routes;
