import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "moment";

import { changeData, createDiscount } from "../../actions/discount";

class FormDiscount extends React.Component {
    onChange(e) {
        let data = {
            ...this.props.dc.discount,
            [e.target.name]: e.target.value
        };
        this.props.dispatch(changeData(data));
    }
    submit() {
        let data = this.props.dc.discount;
        let token = this.props.auth.token;
        let history = this.props.history;
        this.props.dispatch(createDiscount(data, token, history));
    }
    render() {
        const errs = this.props.dc.error;
        const discount = this.props.dc.discount;
        const isCreate = this.props.dc.isCreate;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/discount/data"
                                className="btn btn-green"
                            >
                                <i className="fas fa-angle-left"></i> Back
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <div className="contact100-form">
                                {/* code */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
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
                                        value={
                                            discount === null
                                                ? ""
                                                : discount.code
                                        }
                                        readOnly={isCreate ? false : true}
                                    />
                                </div>

                                {/* Event */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        EVENT *{" "}
                                        <span
                                            className={
                                                errs.event === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.event}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="event"
                                        placeholder="Enter Event"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            discount === null
                                                ? ""
                                                : discount.event
                                        }
                                    />
                                </div>

                                {/* percent */}
                                <div className="wrap-input100 bg1">
                                    <span className="label-input100">
                                        PERCENT *{" "}
                                        <span
                                            className={
                                                errs.percent === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.percent}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="percent"
                                        placeholder="Enter Percent to Discount"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            discount === null
                                                ? ""
                                                : discount.percent
                                        }
                                    />
                                </div>

                                {/* start date */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        START DATE *{" "}
                                        <span
                                            className={
                                                errs.startDate === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.startDate}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="date"
                                        name="startDate"
                                        placeholder="Enter Start Date"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            discount === null
                                                ? ""
                                                : Moment(
                                                      discount.startDate
                                                  ).format("YYYY-MM-DD")
                                        }
                                    />
                                </div>

                                {/* End Date */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        END DATE *{" "}
                                        <span
                                            className={
                                                errs.endDate === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.endDate}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="date"
                                        name="endDate"
                                        placeholder="Enter Event"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            discount === null
                                                ? ""
                                                : Moment(
                                                      discount.endDate
                                                  ).format("YYYY-MM-DD")
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
                                                        discount.isExists
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
                                                        !discount.isExists
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
        dc: store.discount
    };
};

export default connect(mapStateToProps)(FormDiscount);
