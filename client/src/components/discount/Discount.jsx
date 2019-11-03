import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormDiscount from "./FormDiscount.jsx";
import DataDiscount from "./DataDiscount.jsx";

class Discount extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/discount/form"
                    render={props => <FormDiscount {...props} />}
                />

                <Route
                    path="/dashboard/discount/data"
                    render={props => <DataDiscount {...props} />}
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

export default connect(mapStateToProps)(Discount);
