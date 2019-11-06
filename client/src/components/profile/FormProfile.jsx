import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { changeData, createUser } from "../../actions/user";
// import { getRoles } from "../../actions/role";

class FormStaff extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(getRoles(this.props.auth.token));
    // }
    onChange(e) {
        let data = {
            ...this.props.us.user,
            [e.target.name]: e.target.value
        };
        this.props.dispatch(changeData(data));
    }
    submit() {
        let data = this.props.us.user;
        let token = this.props.auth.token;
        let history = this.props.history;
        let isCreate = this.props.us.isCreate;
        this.props.dispatch(createUser(data, token, isCreate, history));
    }
    render() {
        const errs = this.props.us.error;
        const user = this.props.us.user;
        // const roles = this.props.role.roles;
        const isCreate = this.props.us.isCreate;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/staff/data"
                                className="btn btn-green"
                            >
                                <i className="fas fa-angle-left"></i> Back
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <div className="contact100-form">
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        EMAIL *{" "}
                                        <span
                                            className={
                                                errs.email === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.email}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        onChange={this.onChange.bind(this)}
                                        value={user === null ? "" : user.email}
                                        readOnly={isCreate ? false : true}
                                    />
                                </div>

                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        PHONE *{" "}
                                        <span
                                            className={
                                                errs.phone === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.phone}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="number"
                                        name="phone"
                                        placeholder="Enter Phone Number"
                                        onChange={this.onChange.bind(this)}
                                        value={user === null ? "" : user.phone}
                                        readOnly={isCreate ? false : true}
                                    />
                                </div>

                                <div className="wrap-input100 bg1">
                                    <span className="label-input100">
                                        NAME *{" "}
                                        <span
                                            className={
                                                errs.name === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.name}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="name"
                                        placeholder="Enter Name"
                                        onChange={this.onChange.bind(this)}
                                        value={user === null ? "" : user.name}
                                    />
                                </div>

                                <div className="wrap-input100 bg1">
                                    <span className="label-input100">
                                        ADDRESS *{" "}
                                        <span
                                            className={
                                                errs.address === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.address}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="address"
                                        placeholder="Enter Address"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            user === null ? "" : user.address
                                        }
                                    />
                                </div>

                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        NEW PASSWORD *{" "}
                                        <span
                                            className={
                                                errs.password === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.password}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="password"
                                        name="password"
                                        placeholder="Enter Password"
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>

                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        CONFIRM PASSWORD *{" "}
                                        <span
                                            className={
                                                errs.password === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.password}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Enter Confirm Password"
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>

                                <div className="container-contact100-form-btn">
                                    <button
                                        className="btn-handle btn-login"
                                        onClick={this.submit.bind(this)}
                                    >
                                        {isCreate ? "Submit" : "Update"}
                                    </button>
                                </div>
                            </div>
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
        us: store.user,
        role: store.role
    };
};

export default connect(mapStateToProps)(FormStaff);
