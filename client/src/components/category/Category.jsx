import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import FormCategory from "./FormCategory.jsx";
import DataCategory from "./DataCategory.jsx";

class Category extends React.Component {
    render() {
        return (
            <Fragment>
                <Route
                    path="/dashboard/category/form"
                    render={props => <FormCategory {...props} />}
                />

                <Route
                    path="/dashboard/category/data"
                    render={props => <DataCategory {...props} />}
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

export default connect(mapStateToProps)(Category);
