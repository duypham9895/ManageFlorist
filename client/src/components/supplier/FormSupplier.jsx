import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { changeData, createSupplier } from "../../actions/supplier";

class FormSupplier extends React.Component {
    onChange(e) {
        // if (e.target.name === "isExists") {
        //     let boo = e.target.value === "true";
        //     e.target.value = boo;
        //     console.log(e.target.value);
        // }
        let data = {
            ...this.props.supp.supplier,
            [e.target.name]: e.target.value
        };
        // console.log(data);
        this.props.dispatch(changeData(data));
    }
    submit() {
        let data = this.props.supp.supplier;
        let token = this.props.auth.token;
        let history = this.props.history;
        this.props.dispatch(createSupplier(data, token, history));
    }
    render() {
        const errs = this.props.supp.error;
        const supplier = this.props.supp.supplier;
        const isCreate = this.props.supp.isCreate;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/supplier/data"
                                className="btn btn-green"
                            >
                                <i className="fas fa-angle-left"></i> Back
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <div className="contact100-form">
                                <div className="wrap-input100 bg1">
                                    <span className="label-input100">
                                        SUPPLIER'S NAME *{" "}
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
                                        placeholder="Enter Your Name"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            supplier === null
                                                ? ""
                                                : supplier.name
                                        }
                                        readOnly={isCreate ? false : true}
                                    />
                                </div>

                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        Email *{" "}
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
                                        placeholder="Enter Your Email"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            supplier === null
                                                ? ""
                                                : supplier.email
                                        }
                                    />
                                </div>

                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        Phone{" "}
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
                                        type="text"
                                        name="phone"
                                        placeholder="Enter Number Phone"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            supplier === null
                                                ? ""
                                                : supplier.phone
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
                                        placeholder="Enter Your Address"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            supplier === null
                                                ? ""
                                                : supplier.address
                                        }
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
                                                        supplier.isExists
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <label htmlFor="radio1">
                                                    <span>
                                                        <span></span>
                                                    </span>
                                                    Co-operate
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
                                                        !supplier.isExists
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <label htmlFor="radio2">
                                                    <span>
                                                        <span></span>
                                                    </span>
                                                    Uncooperative
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
        supp: store.supplier
    };
};

export default connect(mapStateToProps)(FormSupplier);
