import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import DetailInvoice from "./DetailInvoice.jsx";
import DataInvoice from "./DataInvoice.jsx";

class Invoice extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/invoice/detail"
                    render={props => <DetailInvoice {...props} />}
                />

                <Route
                    path="/dashboard/invoice/data"
                    render={props => <DataInvoice {...props} />}
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

export default connect(mapStateToProps)(Invoice);
