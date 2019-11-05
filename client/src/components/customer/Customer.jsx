import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormCustomer from "./FormCustomer.jsx";
import DataCustomer from "./DataCustomer.jsx";

class Customer extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/customer/form"
                    render={props => <FormCustomer {...props} />}
                />

                <Route
                    path="/dashboard/customer/data"
                    render={props => <DataCustomer {...props} />}
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

export default connect(mapStateToProps)(Customer);
