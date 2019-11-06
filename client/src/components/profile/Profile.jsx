import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormProfile from "./FormProfile.jsx";
import DataProfile from "./DataProfile.jsx";

class Profile extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/profile/form"
                    render={props => <FormProfile {...props} />}
                />

                <Route
                    path="/dashboard/profile/data"
                    render={props => <DataProfile {...props} />}
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

export default connect(mapStateToProps)(Profile);
