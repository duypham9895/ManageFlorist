import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "moment";

import { changeData, createProduct } from "../../actions/product";
import { getCategories } from "../../actions/category";
import { getSuppliers } from "../../actions/supplier";

class FormProduct extends React.Component {
    async componentDidMount() {
        let token = this.props.auth.token;
        await this.props.dispatch(getCategories(token));
        await this.props.dispatch(getSuppliers(token));
    }
    onChange(e) {
        let data = {
            ...this.props.prod.product,
            [e.target.name]: e.target.value
        };
        if (e.target.name === "image") {
            data.image = e.target.files[0];
        }
        // console.log("-=-=-=-=-");
        // let temp = image.split("/");
        // console.log(typeof image);
        //  = { image };
        // c;
        // console.log(image);
        // let categories = this.props.category.categories;
        // let suppliers = this.props.supplier.suppliers;

        // let category = {};
        // let supplier = {};

        // let ct;
        // let sp;

        // if (e.target.name === "category") {
        //     for (ct of categories) {
        //         if (ct.name === e.target.value) {
        //             category = ct;
        //             break;
        //         }
        //     }
        // }

        // if (e.target.name === "supplier") {
        //     for (sp of suppliers) {
        //         if (sp.name === e.target.value) {
        //             supplier = sp;
        //             break;
        //         }
        //     }
        // }

        // if (category !== null) {
        //     data.category = category;
        // }

        // if (supplier !== null) {
        //     data.supplier = supplier;
        // }

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
        const categories = this.props.category.categories;
        const suppliers = this.props.supplier.suppliers;
        // console.log(suppliers);
        // console.log(categories);
        // console.log(product);
        // console.log(product.category === null);

        // if (product.category === undefined || product.category === null) {
        //     product.category = { name: "" };
        // }
        // if (categories === undefined) categories.category = { name: "" };
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
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
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
                                        placeholder="Enter Name"
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            product === null ? "" : product.name
                                        }
                                        readOnly={isCreate ? false : true}
                                    />
                                </div>
                                {/* Qty */}
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        QTY{" "}
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
                                        value={
                                            product === null ? "" : product.qty
                                        }
                                    />
                                </div>

                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        IMPORT PRICE{" "}
                                        <span
                                            className={
                                                errs.importPrice === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.importPrice}
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

                                {/* Status */}
                                {isCreate ? (
                                    ""
                                ) : (
                                    <Fragment>
                                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                                            <span className="label-input100">
                                                RECEIPT DATE{" "}
                                                <span
                                                    className={
                                                        errs.receiptDate === ""
                                                            ? "hidden"
                                                            : "text-error"
                                                    }
                                                >
                                                    {errs.receiptDate}
                                                </span>
                                            </span>
                                            <input
                                                className="input100"
                                                type="text"
                                                name="receiptDate"
                                                placeholder="Enter Number Phone"
                                                onChange={this.onChange.bind(
                                                    this
                                                )}
                                                value={
                                                    product === null
                                                        ? ""
                                                        : Moment(
                                                              product.receiptDate
                                                          ).format(
                                                              "MMM Do YYYY"
                                                          )
                                                }
                                                readOnly
                                            />
                                        </div>

                                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                                            <span className="label-input100">
                                                EXPIRATION DATE{" "}
                                                <span
                                                    className={
                                                        errs.expirationDate ===
                                                        ""
                                                            ? "hidden"
                                                            : "text-error"
                                                    }
                                                >
                                                    {errs.expirationDate}
                                                </span>
                                            </span>
                                            <input
                                                className="input100"
                                                type="text"
                                                name="expirationDate"
                                                placeholder="Enter Your Email"
                                                onChange={this.onChange.bind(
                                                    this
                                                )}
                                                value={
                                                    product === null
                                                        ? ""
                                                        : Moment(
                                                              product.expirationDate
                                                          ).format(
                                                              "MMM Do YYYY"
                                                          )
                                                }
                                                readOnly
                                            />
                                        </div>
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
                                                        Exist
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
                                                        Not Exist
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                )}

                                {/* Image */}

                                <div className="wrap-input100 bg1">
                                    <span className="label-input100">
                                        IMAGES
                                        <span
                                            className={
                                                errs.image === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.image}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        name="image"
                                        type="file"
                                        onChange={this.onChange.bind(this)}
                                    ></input>
                                </div>

                                {/* Description */}
                                <div className="wrap-input100 bg1">
                                    <span className="label-input100">
                                        DESCRIPTION{" "}
                                        <span
                                            className={
                                                errs.description === ""
                                                    ? "hidden"
                                                    : "text-error"
                                            }
                                        >
                                            {errs.description}
                                        </span>
                                    </span>
                                    <textarea
                                        className="input100"
                                        name="description"
                                        placeholder="Description..."
                                        onChange={this.onChange.bind(this)}
                                        value={
                                            product === null
                                                ? ""
                                                : product.description
                                        }
                                    ></textarea>
                                </div>

                                {/* Category */}
                                {isCreate ? (
                                    <Fragment>
                                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                                            <span className="label-input100">
                                                CATEGORY *{" "}
                                                <span
                                                    className={
                                                        errs.category === ""
                                                            ? "hidden"
                                                            : "text-error"
                                                    }
                                                >
                                                    {errs.category}
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
                                                                Select a
                                                                Category
                                                            </span>
                                                        </div>
                                                        <div id="chevrons">
                                                            <i className="fas fa-chevron-up"></i>
                                                            <i className="fas fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                    <div id="options">
                                                        {categories.map(
                                                            (category, key) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="option"
                                                                    >
                                                                        <input
                                                                            className="s-c top"
                                                                            type="radio"
                                                                            name="category"
                                                                            value={
                                                                                category.name
                                                                            }
                                                                            onChange={this.onChange.bind(
                                                                                this
                                                                            )}
                                                                        />
                                                                        <input
                                                                            className="s-c bottom"
                                                                            type="radio"
                                                                            name="category"
                                                                            value={
                                                                                category.name
                                                                            }
                                                                            onChange={this.onChange.bind(
                                                                                this
                                                                            )}
                                                                        />
                                                                        <span className="label">
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </span>
                                                                        <span className="opt-val">
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                );
                                                            }
                                                        )}

                                                        <div id="option-bg"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="wrap-input100 bg1 rs1-wrap-input100">
                                            <span className="label-input100">
                                                SUPPLIER *{" "}
                                                <span
                                                    className={
                                                        errs.supplier === ""
                                                            ? "hidden"
                                                            : "text-error"
                                                    }
                                                >
                                                    {errs.supplier}
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
                                                                Select a
                                                                Supplier
                                                            </span>
                                                        </div>
                                                        <div id="chevrons">
                                                            <i className="fas fa-chevron-up"></i>
                                                            <i className="fas fa-chevron-down"></i>
                                                        </div>
                                                    </div>
                                                    <div id="options">
                                                        {suppliers.map(
                                                            (supplier, key) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            key
                                                                        }
                                                                        className="option"
                                                                    >
                                                                        <input
                                                                            className="s-c top"
                                                                            type="radio"
                                                                            name="supplier"
                                                                            value={
                                                                                supplier.name
                                                                            }
                                                                            onChange={this.onChange.bind(
                                                                                this
                                                                            )}
                                                                        />
                                                                        <input
                                                                            className="s-c bottom"
                                                                            type="radio"
                                                                            name="supplier"
                                                                            value={
                                                                                supplier.name
                                                                            }
                                                                            onChange={this.onChange.bind(
                                                                                this
                                                                            )}
                                                                        />
                                                                        <span className="label">
                                                                            {
                                                                                supplier.name
                                                                            }
                                                                        </span>
                                                                        <span className="opt-val">
                                                                            {
                                                                                supplier.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                );
                                                            }
                                                        )}

                                                        <div id="option-bg"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <div className="wrap-input100 bg1">
                                        <span className="label-input100">
                                            CATEGORY *{" "}
                                            <span
                                                className={
                                                    errs.category === ""
                                                        ? "hidden"
                                                        : "text-error"
                                                }
                                            >
                                                {errs.category}
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
                                                            Select a Category
                                                        </span>
                                                    </div>
                                                    <div id="chevrons">
                                                        <i className="fas fa-chevron-up"></i>
                                                        <i className="fas fa-chevron-down"></i>
                                                    </div>
                                                </div>
                                                <div id="options">
                                                    {categories.map(
                                                        (category, key) => {
                                                            return (
                                                                <div
                                                                    key={key}
                                                                    className="option"
                                                                >
                                                                    <input
                                                                        className="s-c top"
                                                                        type="radio"
                                                                        name="category"
                                                                        value={
                                                                            category.name
                                                                        }
                                                                        defaultChecked={
                                                                            category.name ===
                                                                            product
                                                                                .category
                                                                                .name
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        onChange={this.onChange.bind(
                                                                            this
                                                                        )}
                                                                    />
                                                                    <input
                                                                        className="s-c bottom"
                                                                        type="radio"
                                                                        name="category"
                                                                        value={
                                                                            category.name
                                                                        }
                                                                        defaultChecked={
                                                                            category.name ===
                                                                            product
                                                                                .category
                                                                                .name
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        onChange={this.onChange.bind(
                                                                            this
                                                                        )}
                                                                    />
                                                                    <span className="label">
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </span>
                                                                    <span className="opt-val">
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                    )}

                                                    <div id="option-bg"></div>
                                                </div>
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
        prod: store.product,
        category: store.category,
        supplier: store.supplier
    };
};

export default connect(mapStateToProps)(FormProduct);
