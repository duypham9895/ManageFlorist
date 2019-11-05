import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { changeData, createCustomer } from "../../actions/customer";

class FormCustomer extends React.Component {
    onChange(e) {
        let data = {
            ...this.props.us.customer,
            [e.target.name]: e.target.value
        };
        this.props.dispatch(changeData(data));
    }
    submit() {
        let data = this.props.us.customer;
        let token = this.props.auth.token;
        let history = this.props.history;
        let isCreate = this.props.us.isCreate;
        this.props.dispatch(createCustomer(data, token, isCreate, history));
    }
    render() {
        const errs = this.props.us.error;
        const customer = this.props.us.customer;
        const isCreate = this.props.us.isCreate;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/customer/data"
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
                                        value={
                                            customer === null
                                                ? ""
                                                : customer.email
                                        }
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
                                        value={
                                            customer === null
                                                ? ""
                                                : customer.phone
                                        }
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
                                        value={
                                            customer === null
                                                ? ""
                                                : customer.name
                                        }
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
                                            customer === null
                                                ? ""
                                                : customer.address
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

                                {isCreate ? (
                                    ""
                                ) : (
                                    <Fragment>
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
                                                            customer.isExists
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
                                                            !customer.isExists
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

                                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                                            <span className="label-input100">
                                                POINT *{" "}
                                                <span
                                                    className={
                                                        errs.point === ""
                                                            ? "hidden"
                                                            : "text-error"
                                                    }
                                                >
                                                    {errs.point}
                                                </span>
                                            </span>
                                            <input
                                                className="input100"
                                                type="number"
                                                name="point"
                                                placeholder="Enter Salary"
                                                onChange={this.onChange.bind(
                                                    this
                                                )}
                                                value={
                                                    customer === null
                                                        ? ""
                                                        : customer.point
                                                }
                                                readOnly
                                            />
                                        </div>

                                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                                            <span className="label-input100">
                                                LEVEL *{" "}
                                                <span
                                                    className={
                                                        errs.level === ""
                                                            ? "hidden"
                                                            : "text-error"
                                                    }
                                                >
                                                    {errs.level}
                                                </span>
                                            </span>
                                            <input
                                                className="input100"
                                                type="number"
                                                name="level"
                                                placeholder="Enter Target"
                                                onChange={this.onChange.bind(
                                                    this
                                                )}
                                                value={
                                                    customer === null
                                                        ? ""
                                                        : customer.level
                                                }
                                                readOnly
                                            />
                                        </div>
                                    </Fragment>
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
        us: store.customer
    };
};

export default connect(mapStateToProps)(FormCustomer);
