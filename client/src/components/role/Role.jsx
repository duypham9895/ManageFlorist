import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormRole from "./FormRole.jsx";
import DataRole from "./DataRole.jsx";

class Role extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/role/form"
                    render={props => <FormRole {...props} />}
                />

                <Route
                    path="/dashboard/role/data"
                    render={props => <DataRole {...props} />}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    };
};

export default connect(mapStateToProps)(Role);
