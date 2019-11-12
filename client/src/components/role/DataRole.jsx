import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "moment";

import {
    getRoles,
    changeData,
    deleteRole,
    refreshRole
} from "../../actions/role";

class DataRole extends React.Component {
    componentDidMount() {
        this.props.dispatch(getRoles(this.props.auth.token));
    }
    edit(data) {
        data.isCreate = false;
        this.props.dispatch(changeData(data));
    }

    delete(id) {
        this.props.dispatch(deleteRole(id, this.props.auth.token));
    }

    refresh() {
        this.props.dispatch(refreshRole());
    }
    render() {
        const roles = this.props.role.roles;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/role/form"
                                className="btn btn-green"
                                onClick={this.refresh.bind(this)}
                            >
                                + New Role
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>CODE</th>
                                        <th>NAME</th>
                                        <th>QTY</th>
                                        <th>CREATE DATE</th>
                                        <th>STATUS</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{role.code}</td>
                                                <td>{role.name}</td>
                                                <td>{role.qty}</td>
                                                <td>
                                                    {Moment(
                                                        role.dateCreate
                                                    ).format("DD-MM-YYYY")}
                                                </td>
                                                <td>
                                                    <div
                                                        className={
                                                            role.isExists
                                                                ? "circle check"
                                                                : "circle uncheck"
                                                        }
                                                    ></div>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="/dashboard/role/form"
                                                        onClick={this.edit.bind(
                                                            this,
                                                            role
                                                        )}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="pointer"
                                                        onClick={this.delete.bind(
                                                            this,
                                                            role._id
                                                        )}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth,
        role: store.role
    };
};

export default connect(mapStateToProps)(DataRole);
