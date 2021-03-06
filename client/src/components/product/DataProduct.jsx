import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "moment";
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import {
    getProducts,
    changeData,
    deleteProduct,
    refreshProduct
} from "../../actions/product";

import { addToCart } from "../../actions/order";

import { getInventories } from "../../actions/inventory";

class DataProduct extends React.Component {
    async componentDidMount() {
        let token = this.props.auth.token;
        await this.props.dispatch(getInventories(token));
        await this.props.dispatch(getProducts(token));
    }

    edit(data, inventory) {
        data.isCreate = false;
        let stock;
        for (stock in inventory) {
            if (stock === "product") {
                continue;
            }
            data[stock] = inventory[stock];
        }
        this.props.dispatch(changeData(data));
    }

    delete(id) {
        this.props.dispatch(deleteProduct(id, this.props.auth.token));
    }

    refresh() {
        this.props.dispatch(refreshProduct());
    }

    add(product) {
        let cart = {
            invoice: "",
            product: product,
            qty: 1
        };
        this.props.dispatch(addToCart(cart));

        store.addNotification({
            title: "",
            message: "Successful add product to cart",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 1500,
              onScreen: true
            }
          });
    }
    render() {
        const products = this.props.prod.products;
        const stocks = this.props.inventory.stocks;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <ReactNotification />
                            <Link
                                to="/dashboard/product/form"
                                className="btn btn-green"
                                onClick={this.refresh.bind(this)}
                            >
                                + New Product
                            </Link>
                        </div>
                    </div>

                    <div className="cards">
                        <div className="row">
                            <div className="col-md-12">
                                {products.map((prd, key) => {
                                    return (
                                        <div
                                            className={
                                                !prd.isExists
                                                    ? "card bg-OOS"
                                                    : "card"
                                            }
                                            key={key}
                                        >
                                            {!prd.isExists ? (
                                                <p className="text-OOS">OUT</p>
                                            ) : (
                                                ""
                                            )}
                                            <img
                                                src={prd.image}
                                                alt={prd.name}
                                                className="product-img-list"
                                            />
                                            <span className="name">
                                                {prd.name}
                                            </span>
                                            <div className="col-md-5">
                                                <p className="education">
                                                    Category
                                                </p>
                                                <p className="education">Qty</p>
                                                <p className="education">
                                                    Expiration Date
                                                </p>
                                                <p className="education">
                                                    Option
                                                </p>
                                            </div>

                                            <div className="col-md-7">
                                                <p className="schools">
                                                    {prd.category.name}
                                                </p>
                                                <p className="schools">
                                                    {stocks[key].product
                                                        .name === prd.name
                                                        ? stocks[key].qty
                                                        : "null"}
                                                </p>
                                                <p className="schools">
                                                    {Moment(
                                                        prd.dateCreate
                                                    ).format("MMMM Do YYYY")}
                                                </p>
                                                <div className="schools">
                                                    <span
                                                        className="pointer"
                                                        onClick={this.add.bind(
                                                            this,
                                                            prd
                                                        )}
                                                    >
                                                        <i className="fas fa-cart-plus"></i>
                                                    </span>

                                                    <Link
                                                        to="/dashboard/product/form"
                                                        onClick={this.edit.bind(
                                                            this,
                                                            prd,
                                                            stocks[key]
                                                        )}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="pointer"
                                                        onClick={this.delete.bind(
                                                            this,
                                                            prd._id,
                                                            this.props.history
                                                        )}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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
        inventory: store.inventory,
        order: store.order
    };
};

export default connect(mapStateToProps)(DataProduct);
