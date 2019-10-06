import React, { Fragment } from "react";
import { connect } from "react-redux";

class Orders extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Orders</h1>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    };
};

export default connect(mapStateToProps)(Orders);
