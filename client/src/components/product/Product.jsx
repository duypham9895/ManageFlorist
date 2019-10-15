import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormProduct from "./FormProduct.jsx";
import DataProduct from "./DataProduct.jsx";

class Product extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/product/form"
                    render={props => <FormProduct {...props} />}
                />

                <Route
                    path="/dashboard/product/data"
                    render={props => <DataProduct {...props} />}
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

export default connect(mapStateToProps)(Product);
