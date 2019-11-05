import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "moment";

import {
    getCustomers,
    changeData,
    refreshCustomer,
    deleteCustomer
} from "../../actions/customer";

class DataCustomer extends React.Component {
    async componentDidMount() {
        let token = this.props.auth.token;
        await this.props.dispatch(getCustomers(token));
    }
    edit(data) {
        data.isCreate = false;
        let temp;
        for (temp in data.account) {
            data[temp] = data.account[temp];
        }
        this.props.dispatch(changeData(data));
    }
    refresh() {
        this.props.dispatch(refreshCustomer());
    }
    delete(id) {
        this.props.dispatch(deleteCustomer(id, this.props.auth.token));
    }
    render() {
        const customers = this.props.customer.customers;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/customer/form"
                                className="btn btn-green"
                                onClick={this.refresh.bind(this)}
                            >
                                + New Customer
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE</th>
                                        <th>POINT</th>
                                        <th>LEVEL</th>
                                        <th>DATE</th>
                                        <th>STATUS</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>
                                                    <img
                                                        src={
                                                            customer.account
                                                                .avatar
                                                        }
                                                        alt=""
                                                        className="product-img"
                                                    />
                                                </td>
                                                <td>{customer.account.name}</td>
                                                <td>
                                                    {customer.account.email}
                                                </td>
                                                <td>
                                                    {customer.account.phone}
                                                </td>
                                                <td>{customer.point}</td>
                                                <td>{customer.level}</td>
                                                <td>
                                                    {Moment(
                                                        customer.account
                                                            .dateCreate
                                                    ).format("DD-MM-YYYY")}
                                                </td>
                                                <td>
                                                    <div
                                                        className={
                                                            customer.account
                                                                .isExists
                                                                ? "circle check"
                                                                : "circle uncheck"
                                                        }
                                                    ></div>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="/dashboard/customer/form"
                                                        onClick={this.edit.bind(
                                                            this,
                                                            customer
                                                        )}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="pointer"
                                                        onClick={this.delete.bind(
                                                            this,
                                                            customer.account._id
                                                        )}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {/* <tr>
                                        <td>
                                            <img
                                                src="https://res.cloudinary.com/duypham9895/image/upload/v1569165296/sample.jpg"
                                                alt=""
                                                className="product-img"
                                            />
                                        </td>
                                        <td>Rose</td>
                                        <td>Party</td>
                                        <td>ABC</td>
                                        <td>111</td>

                                        <td>
                                            <div className="circle check"></div>
                                        </td>
                                        <td>2.99</td>
                                        <td>3.5</td>
                                        <td>duypham</td>
                                        <td>
                                            <a href="/#">
                                                <i className="far fa-eye"></i>
                                            </a>
                                            <a href="/#">
                                                <i className="fas fa-edit"></i>
                                            </a>
                                            <a href="/#">
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr> */}
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
        customer: store.customer,
        receipt: store.receipt
    };
};

export default connect(mapStateToProps)(DataCustomer);
