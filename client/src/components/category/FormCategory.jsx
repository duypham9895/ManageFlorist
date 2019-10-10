import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { changeData, createCategory } from "../../actions/category";

class FormCategory extends React.Component {
    onChange(e) {
        let data = {
            ...this.props.ctgr.category,
            [e.target.name]: e.target.value
        };
        this.props.dispatch(changeData(data));
    }
    submit() {
        let data = this.props.ctgr.category;
        let token = this.props.auth.token;
        let history = this.props.history;
        this.props.dispatch(createCategory(data, token, history));
    }
    render() {
        const errs = this.props.ctgr.error;
        const category = this.props.ctgr.category;
        const isCreate = this.props.ctgr.isCreate;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/category/data"
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
                                        CATEGORY'S NAME *{" "}
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
                                            category === null
                                                ? ""
                                                : category.name
                                        }
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
                                                        category.isExists
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
                                                        !category.isExists
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
        ctgr: store.category
    };
};

export default connect(mapStateToProps)(FormCategory);
