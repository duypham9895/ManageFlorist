import React, { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "moment";
import Spinner from "../layout/Sidebar";

import { getInvoices, getInvoice } from "../../actions/invoice";

class DataInvoice extends React.Component {
    componentDidMount() {
        this.props.dispatch(getInvoices(this.props.auth.token));
    }
    async detail(token, id, invoice) {
        await this.props.dispatch(getInvoice(token, id, invoice));
        await this.props.history.push("/dashboard/invoice/detail");
    }
    render() {
        const invoices = this.props.invoice.invoices;
        return this.props.invoice.loading && invoices == null ? (
            <Fragment>
                <Spinner />
            </Fragment>
        ) : (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="heading">
                            <h1>Dashboard</h1>
                        </div>
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>STAFF</th>
                                        <th>CUSTOMER</th>
                                        <th>TOTAL</th>
                                        <th>CREATED DATE</th>
                                        <th>DISCOUNT</th>
                                        <th>OPTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((iv, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>
                                                    {iv.member.account.name}
                                                </td>
                                                <td>
                                                    {iv.customer.account.name}
                                                </td>
                                                <td>{iv.total}</td>
                                                <td>
                                                    {Moment(
                                                        iv.dateCreate
                                                    ).format("DD-MM-YYYY")}
                                                </td>
                                                {iv.discount === null ? (
                                                    <td>No Discount</td>
                                                ) : (
                                                    <td>
                                                        {iv.discount.percent *
                                                            100}
                                                        %
                                                    </td>
                                                )}

                                                <td>
                                                    <span
                                                        className="pointer"
                                                        onClick={this.detail.bind(
                                                            this,
                                                            this.props.auth
                                                                .token,
                                                            iv._id,
                                                            iv
                                                        )}
                                                    >
                                                        <i className="fas fa-info-circle"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
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
        invoice: store.invoice
    };
};

export default connect(mapStateToProps)(DataInvoice);
