import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormStaff from "./FormStaff.jsx";
import DataStaff from "./DataStaff.jsx";

class Staff extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/staff/form"
                    render={props => <FormStaff {...props} />}
                />

                <Route
                    path="/dashboard/staff/data"
                    render={props => <DataStaff {...props} />}
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

export default connect(mapStateToProps)(Staff);
