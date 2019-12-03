import React, { Fragment } from "react";
import { connect } from "react-redux";

import { 
    changeData, 
    createInvoice, 
    changeDataCarts, 
    deleteOrder 
} from "../../actions/order";

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

    changeQty(e, cart){
        let value = e.target.value;
        
        if( value === 0 || value === ""){
            return;
        }
        for (let i = 0 ; i < value.length; i++){
            if(parseInt(value[0]) === 0){
                return;
            }
        }

        let carts = [...this.props.order.carts]
        let temp;
        for (temp of carts){
            if (temp === cart){
                cart.qty = value
            }
        }

        this.props.dispatch(changeDataCarts(carts));
    }

    delete(cart){
        this.props.dispatch(deleteOrder(cart));
    }

    submit() {
        let token = this.props.auth.token;
        let orders = this.props.order;
        this.props.dispatch(createInvoice(token, orders, this.props.history));
    }
    render() {
        const orders = this.props.order.carts;
        const discounts = this.props.discount.discounts;
        var qty = 0;
        var total = 0;
        if(orders.length > 0){
            let order;
            for(order of orders){
                qty += parseInt(order.qty);
                total +=  parseInt(order.product.sellingPrice * order.qty);
            }
        }
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
                                        <th></th>
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
                                                    <td>
                                                        <input
                                                            className=""
                                                            type="number"
                                                            min="1"
                                                            name="qty"
                                                            onChange={(e) => this.changeQty(e, order)}
                                                            value={ order.qty}
                                                        />
                                                    </td>
                                                    <td>
                                                        {
                                                            order.product
                                                                .sellingPrice
                                                        }
                                                    </td>
                                                    <td>
                                                        <span
                                                            className="pointer"
                                                            onClick={this.delete.bind(
                                                                this,
                                                                order
                                                            )}
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                )}
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Total = </td>
                                        <td>{qty}</td>
                                        <td>{total}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
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
