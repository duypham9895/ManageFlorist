import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

class FormCategory extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Form Category</h1>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    };
};

export default connect(mapStateToProps)(FormCategory);
