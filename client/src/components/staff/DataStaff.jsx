import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "moment";

import {
    getUsers,
    changeData,
    refreshUser,
    deleteUser
} from "../../actions/user";

class DataStaff extends React.Component {
    async componentDidMount() {
        let token = this.props.auth.token;
        await this.props.dispatch(getUsers(token));
    }
    edit(data) {
        data.isCreate = false;
        let temp;
        for (temp in data.account) {
            data[temp] = data.account[temp];
        }

        data["code"] = data.role.code;
        this.props.dispatch(changeData(data));
    }
    refresh() {
        this.props.dispatch(refreshUser());
    }
    delete(id) {
        this.props.dispatch(deleteUser(id, this.props.auth.token));
    }
    render() {
        // console.log(this.props.user.users);
        const users = this.props.user.users;
        // let acc = {};
        // for (let i = 0; i < users.length; i++) {
        //     if (users[i].account.token === this.props.auth.token) {
        //         acc = users[i];
        //         users.splice(users.indexOf(users[i]), 1);
        //     }
        // }
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/staff/form"
                                className="btn btn-green"
                                onClick={this.refresh.bind(this)}
                            >
                                + New User
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE</th>
                                        <th>SALARY</th>
                                        <th>TARGET</th>
                                        <th>SOLD</th>
                                        <th>ROLE</th>
                                        <th>DATE</th>
                                        <th>STATUS</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>
                                                    <img
                                                        src={
                                                            user.account.avatar
                                                        }
                                                        alt=""
                                                        className="product-img"
                                                    />
                                                </td>
                                                <td>{user.account.name}</td>
                                                <td>{user.account.email}</td>
                                                <td>{user.account.phone}</td>
                                                <td>{user.salary}</td>
                                                <td>{user.target}</td>
                                                <td>{user.sold}</td>
                                                <td>{user.role.name}</td>
                                                <td>
                                                    {Moment(
                                                        user.account.dateCreate
                                                    ).format("DD-MM-YYYY")}
                                                </td>
                                                <td>
                                                    <div
                                                        className={
                                                            user.account
                                                                .isExists
                                                                ? "circle check"
                                                                : "circle uncheck"
                                                        }
                                                    ></div>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="/dashboard/staff/form"
                                                        onClick={this.edit.bind(
                                                            this,
                                                            user
                                                        )}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="pointer"
                                                        onClick={this.delete.bind(
                                                            this,
                                                            user.account._id
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
        user: store.user,
        receipt: store.receipt
    };
};

export default connect(mapStateToProps)(DataStaff);
