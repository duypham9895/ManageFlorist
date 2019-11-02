import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormInventory from "./FormInventory.jsx";
import DataInventory from "./DataInventory.jsx";

class Inventory extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/inventory/form"
                    render={props => <FormInventory {...props} />}
                />

                <Route
                    path="/dashboard/inventory/data"
                    render={props => <DataInventory {...props} />}
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

export default connect(mapStateToProps)(Inventory);
