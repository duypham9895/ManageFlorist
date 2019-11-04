import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { changeData, createRole } from "../../actions/role";

class FormRole extends React.Component {
    onChange(e) {
        let data = {
            ...this.props.rl.role,
            [e.target.name]: e.target.value
        };
        this.props.dispatch(changeData(data));
    }
    submit() {
        let data = this.props.rl.role;
        let token = this.props.auth.token;
        let history = this.props.history;
        this.props.dispatch(createRole(data, token, history));
    }
    render() {
        const errs = this.props.rl.error;
        const role = this.props.rl.role;
        const isCreate = this.props.rl.isCreate;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/role/data"
                                className="btn btn-green"
                            >
                                <i className="fas fa-angle-left"></i> Back
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="contact100-form">
                                {/* Name */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
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
                                        placeholder="Enter Name Role"
                                        onChange={this.onChange.bind(this)}
                                        value={role === null ? "" : role.name}
                                    />
                                </div>
                                {/* Qty */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        QTY *{" "}
                                        <span
                                            className={
                                                errs.qty === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.qty}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="number"
                                        name="qty"
                                        placeholder="Enter Qty"
                                        onChange={this.onChange.bind(this)}
                                        value={role === null ? "" : role.qty}
                                    />
                                </div>
                                {/* code */}
                                <div className="wrap-input100">
                                    <span className="label-input100">
                                        CODE *{" "}
                                        <span
                                            className={
                                                errs.code === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.code}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="code"
                                        placeholder="Enter Code"
                                        onChange={this.onChange.bind(this)}
                                        value={role === null ? "" : role.code}
                                        readOnly={isCreate ? false : true}
                                    />
                                </div>

                                {isCreate ? (
                                    ""
                                ) : (
                                    <div className="wrap-input100 input100-select bg1">
                                        <span className="label-input100">
                                            STATUS
                                        </span>
                                        <div>
                                            <div>
                                                <input
                                                    id="radio1"
                                                    type="radio"
                                                    name="isExists"
                                                    value={true}
                                                    onChange={this.onChange.bind(
                                                        this
                                                    )}
                                                    checked={
                                                        role.isExists
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <label htmlFor="radio1">
                                                    <span>
                                                        <span></span>
                                                    </span>
                                                    Active
                                                </label>
                                            </div>
                                            <div>
                                                <input
                                                    id="radio2"
                                                    type="radio"
                                                    name="isExists"
                                                    value={false}
                                                    onChange={this.onChange.bind(
                                                        this
                                                    )}
                                                    checked={
                                                        !role.isExists
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <label htmlFor="radio2">
                                                    <span>
                                                        <span></span>
                                                    </span>
                                                    Inactive
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

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
        rl: store.role
    };
};

export default connect(mapStateToProps)(FormRole);
