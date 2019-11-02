import React, { Fragment } from "react";
import { connect } from "react-redux";

class FormInventory extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Form Inventory</h1>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    };
};

export default connect(mapStateToProps)(FormInventory);
