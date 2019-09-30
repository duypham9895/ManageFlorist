import React from "react";
import { connect } from "react-redux";

class Dashboard extends React.Component {
    render() {
        console.log(this.props.token);
        return (
            <div>
                {this.props.token === null ? (
                    <p>dashboard</p>
                ) : (
                    <p>{"welcome " + this.props.token}</p>
                )}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        token: store.auth.token
    };
};

export default connect(mapStateToProps)(Dashboard);
