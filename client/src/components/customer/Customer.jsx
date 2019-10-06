import React, { Fragment } from "react";
import { connect } from "react-redux";

class Customer extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Customer</h1>
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
