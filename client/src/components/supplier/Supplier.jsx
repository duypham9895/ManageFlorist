import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormSupplier from "./FormSupplier.jsx";
import DataSupplier from "./DataSupplier.jsx";

class Supplier extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/supplier/form"
                    render={props => <FormSupplier {...props} />}
                />

                <Route
                    path="/dashboard/supplier/data"
                    render={props => <DataSupplier {...props} />}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {};
};

export default connect(mapStateToProps)(Supplier);
