import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormDecentralization from "./FormDecentralization.jsx";
import DataDecentralization from "./DataDecentralization.jsx";

class Decentralization extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/decentralization/form"
                    render={props => <FormDecentralization {...props} />}
                />

                <Route
                    path="/dashboard/decentralization/data"
                    render={props => <DataDecentralization {...props} />}
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

export default connect(mapStateToProps)(Decentralization);
