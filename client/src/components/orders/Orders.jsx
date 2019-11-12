import React, { Fragment } from "react";
import { connect } from "react-redux";

import { changeData, createInvoice } from "../../actions/order";
import { getDiscounts } from "../../actions/discount";
class Orders extends React.Component {
    componentDidMount() {
        this.props.dispatch(getDiscounts(this.props.auth.token));
    }
    onChange(e) {
        let data = {
            ...this.props.order.cart,
            [e.target.name]: e.target.value
        };
        this.props.dispatch(changeData(data));
    }

    submit() {
        let token = this.props.auth.token;
        let orders = this.props.order;
        this.props.dispatch(createInvoice(token, orders, this.props.history));
    }
    render() {
        const orders = this.props.order.carts;
        const discounts = this.props.discount.discounts;
        // console.log(this.props.order);
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="heading">
                                <h1>CREATE ORDERS</h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <div className="heading">
                                <h1>CUSTOMER</h1>
                            </div>
                            <div className="contact100-form">
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        CUSTOMER'S NAME
                                    </span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="name"
                                        placeholder="Enter Customer's Name"
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>
                                <div className="wrap-input100 bg1 rs1-wrap-input100">
                                    <span className="label-input100">
                                        CUSTOMER'S PHONE
                                    </span>
                                    <input
                                        className="input100"
                                        type="number"
                                        name="phone"
                                        placeholder="Enter Customer's Phone"
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>

                                <div className="wrap-input100 bg1">
                                    <span className="label-input100">
                                        DISCOUNT CODE{" "}
                                        <span className="text-error">
                                            {discounts.map((discount, key) => {
                                                if (
                                                    discount.code ===
                                                    this.props.order.cart.code
                                                ) {
                                                    return (
                                                        discount.percent * 100 +
                                                        "%"
                                                    );
                                                } else {
                                                    return "";
                                                }
                                            })}
                                        </span>
                                    </span>
                                    <input
                                        className="input100"
                                        type="text"
                                        name="code"
                                        placeholder="Enter Your Name"
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="heading">
                            <h1>ORDERS</h1>
                        </div>
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>CATEGORY</th>
                                        <th>EXPIRED DAYS</th>
                                        <th>QTY</th>
                                        <th>UNIT PRICE</th>
                                    </tr>
                                </thead>
                                {orders.length === 0 ? (
                                    <tbody></tbody>
                                ) : (
                                    <tbody>
                                        {orders.map((order, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{key + 1}</td>

                                                    <td>
                                                        <img
                                                            src={
                                                                order.product
                                                                    .image
                                                            }
                                                            alt=""
                                                            className="product-img"
                                                        />
                                                    </td>
                                                    <td>
                                                        {order.product.name}
                                                    </td>
                                                    <td>
                                                        {
                                                            order.product
                                                                .category.name
                                                        }
                                                    </td>
                                                    <td>
                                                        {order.product.expired}
                                                    </td>
                                                    <td>{order.qty}</td>
                                                    <td>
                                                        {
                                                            order.product
                                                                .sellingPrice
                                                        }
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                    {orders.length > 0 ? (
                        <div className="container-contact100-form-btn">
                            <button
                                className="btn-handle btn-login"
                                onClick={this.submit.bind(this)}
                            >
                                Submit
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth,
        order: store.order,
        discount: store.discount
    };
};

export default connect(mapStateToProps)(Orders);
