import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "moment";

import { refreshInvoice, getInvoice } from "../../actions/invoice";

class DetailInvoice extends React.Component {
    detail(token, id, invoice) {
        this.props.dispatch(getInvoice(token, id, invoice));
    }

    refresh() {
        this.props.dispatch(refreshInvoice());
    }
    render() {
        const invoice = this.props.iv.invoice;
        // console.log(invoice.member.account);
        const customer = invoice.customer;
        const member = invoice.member;
        // const invoices = this.props.iv.invoices;
        const invoiceDetail = this.props.iv.invoiceDetail;
        let qty = 0,
            temp;
        for (temp of invoiceDetail) {
            qty += temp.qty;
        }
        // console.log(qty);
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="heading">
                                <h1>Order Detail</h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="heading">
                            <h1>STAFF</h1>
                        </div>
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE</th>
                                        <th>TARGET</th>
                                        <th>SOLD</th>
                                        <th>ROLE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img
                                                src={member.account.avatar}
                                                alt=""
                                                className="product-img"
                                            />
                                        </td>
                                        <td>{member.account.name}</td>
                                        <td>{member.account.email}</td>
                                        <td>{member.account.phone}</td>
                                        {member.target === null ? (
                                            <td></td>
                                        ) : (
                                            <td>{member.target}</td>
                                        )}

                                        {member.sold === null ? (
                                            <td></td>
                                        ) : (
                                            <td>{member.sold}</td>
                                        )}

                                        <td>{member.role.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="heading">
                            <h1>CUSTOMER</h1>
                        </div>
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE</th>
                                        <th>ADDRESS</th>
                                        <th>POINT</th>
                                        <th>LEVEL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img
                                                src={customer.account.avatar}
                                                alt=""
                                                className="product-img"
                                            />
                                        </td>
                                        <td>{customer.account.name}</td>
                                        <td>{customer.account.email}</td>
                                        <td>{customer.account.phone}</td>
                                        <td>{customer.account.address}</td>
                                        {customer.point === null ? (
                                            <td></td>
                                        ) : (
                                            <td>{customer.point}</td>
                                        )}

                                        {customer.level === null ? (
                                            <td></td>
                                        ) : (
                                            <td>{customer.level}</td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
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
                                        <th>CREATED DATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceDetail.map((dt, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>
                                                    <img
                                                        src={dt.product.image}
                                                        alt=""
                                                        className="product-img"
                                                    />
                                                </td>
                                                <td>{dt.product.name}</td>
                                                <td>
                                                    {dt.product.category.name}
                                                </td>
                                                <td>{dt.product.expired}</td>
                                                <td>{dt.qty}</td>
                                                <td>{dt.unitPrice}</td>
                                                <td>
                                                    {Moment(
                                                        dt.dateCreate
                                                    ).format("MMM Do YYYY")}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>TOTAL:</td>
                                        <td>{qty}</td>
                                        <td>{invoice.total}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
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
        iv: store.invoice
    };
};

export default connect(mapStateToProps)(DetailInvoice);
