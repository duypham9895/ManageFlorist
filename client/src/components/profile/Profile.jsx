import React, { Fragment } from "react";
import { connect } from "react-redux";

class Profile extends React.Component {
    render() {
        return (
            <Fragment>
                <h1>Profile</h1>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    };
};

export default connect(mapStateToProps)(Profile);
