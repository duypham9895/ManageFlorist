import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { changeData, createProduct } from "../../actions/product";

class FormProduct extends React.Component {
    onChange(e) {
        let data = {
            ...this.props.prod.product,
            [e.target.name]: e.target.value
        };
        this.props.dispatch(changeData(data));
    }
    submit() {
        let data = this.props.prod.product;
        let token = this.props.auth.token;
        let history = this.props.history;
        this.props.dispatch(createProduct(data, token, history));
    }
    render() {
        const errs = this.props.prod.error;
        const product = this.props.prod.product;
        const isCreate = this.props.prod.isCreate;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/product/data"
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
                                        PRODUCT'S NAME *{" "}
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
                                            product === null ? "" : product.name
                                        }
                                        readOnly={isCreate ? false : true}
                                    />
                                </div>
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        IMPORT PRICE{" "}
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
                                        type="number"
                                        name="importPrice"
                                        placeholder="Enter Import Price"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            product === null
                                                ? ""
                                                : product.importPrice
                                        }
                                    />
                                </div>

                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        SELLING PRICE{" "}
                                        <span
                                            className={
                                                errs.sellingPrice === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.sellingPrice}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="number"
                                        name="sellingPrice"
                                        placeholder="Enter Selling Price"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            product === null
                                                ? ""
                                                : product.sellingPrice
                                        }
                                    />
                                </div>

                                <div className="wrap-input100 bg1">
                                    <span className="label-input100">
                                        EXPIRED{" "}
                                        <span
                                            className={
                                                errs.expired === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.expired}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="number"
                                        name="expired"
                                        placeholder="Enter Expired"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            product === null
                                                ? ""
                                                : product.expired
                                        }
                                    />
                                </div>

                                {/* Import price */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        EXPIRATION DATE *{" "}
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
                                        type="date"
                                        name="expirationDate"
                                        placeholder="Enter Your Email"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            product === null
                                                ? ""
                                                : product.email
                                        }
                                        readOnly
                                    />
                                </div>

                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        RECEIPT DATE{" "}
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
                                        type="date"
                                        name="expirationDate"
                                        placeholder="Enter Number Phone"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            product === null
                                                ? ""
                                                : product.phone
                                        }
                                        readOnly
                                    />
                                </div>

                                {/* Category */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        CATEGORY *{" "}
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
                                    <div id="app-cover">
                                        <div id="select-box">
                                            <input
                                                type="checkbox"
                                                id="options-view-button"
                                            />
                                            <div id="select-button" class="brd">
                                                <div id="selected-value">
                                                    <span>
                                                        Select a platform
                                                    </span>
                                                </div>
                                                <div id="chevrons">
                                                    <i class="fas fa-chevron-up"></i>
                                                    <i class="fas fa-chevron-down"></i>
                                                </div>
                                            </div>
                                            <div id="options">
                                                <div class="option">
                                                    <input
                                                        class="s-c top"
                                                        type="radio"
                                                        name="platform"
                                                        value="codepen"
                                                    />
                                                    <input
                                                        class="s-c bottom"
                                                        type="radio"
                                                        name="platform"
                                                        value="codepen"
                                                    />
                                                    <i class="fab fa-codepen"></i>
                                                    <span class="label">
                                                        CodePen
                                                    </span>
                                                    <span class="opt-val">
                                                        CodePen
                                                    </span>
                                                </div>
                                                <div class="option">
                                                    <input
                                                        class="s-c top"
                                                        type="radio"
                                                        name="platform"
                                                        value="dribbble"
                                                    />
                                                    <input
                                                        class="s-c bottom"
                                                        type="radio"
                                                        name="platform"
                                                        value="dribbble"
                                                        defaultChecked
                                                    />
                                                    <i class="fab fa-dribbble"></i>
                                                    <span class="label">
                                                        Dribbble
                                                    </span>
                                                    <span class="opt-val">
                                                        Dribbble
                                                    </span>
                                                </div>

                                                <div id="option-bg"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Supplier */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        SUPPLIER *{" "}
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
                                    <div id="app-cover">
                                        <div id="select-box">
                                            <input
                                                type="checkbox"
                                                id="options-view-button"
                                            />
                                            <div
                                                id="select-button"
                                                className="brd"
                                            >
                                                <div id="selected-value">
                                                    <span>
                                                        Select a platform
                                                    </span>
                                                </div>
                                                <div id="chevrons">
                                                    <i className="fas fa-chevron-up"></i>
                                                    <i className="fas fa-chevron-down"></i>
                                                </div>
                                            </div>
                                            <div id="options">
                                                <div className="option">
                                                    <input
                                                        className="s-c top"
                                                        type="radio"
                                                        name="platform"
                                                        value="codepen"
                                                    />
                                                    <input
                                                        className="s-c bottom"
                                                        type="radio"
                                                        name="platform"
                                                        value="codepen"
                                                    />
                                                    <i className="fab fa-codepen"></i>
                                                    <span className="label">
                                                        CodePen
                                                    </span>
                                                    <span className="opt-val">
                                                        CodePen
                                                    </span>
                                                </div>
                                                <div className="option">
                                                    <input
                                                        className="s-c top"
                                                        type="radio"
                                                        name="platform"
                                                        value="dribbble"
                                                    />
                                                    <input
                                                        className="s-c bottom"
                                                        type="radio"
                                                        name="platform"
                                                        value="dribbble"
                                                    />
                                                    <i className="fab fa-dribbble"></i>
                                                    <span className="label">
                                                        Dribbble
                                                    </span>
                                                    <span className="opt-val">
                                                        Dribbble
                                                    </span>
                                                </div>

                                                <div id="option-bg"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* {isCreate ? (
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
                                                        product.isExists
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
                                                        !product.isExists
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
                                )} */}

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
        prod: store.product
    };
};

export default connect(mapStateToProps)(FormProduct);
