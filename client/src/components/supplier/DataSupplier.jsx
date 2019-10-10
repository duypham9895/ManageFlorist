import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
    getSuppliers,
    changeData,
    deleteSupplier,
    refreshSupplier
} from "../../actions/supplier";

class DataSupplier extends React.Component {
    componentDidMount() {
        this.props.dispatch(getSuppliers(this.props.auth.token));
    }

    edit(data) {
        data.isCreate = false;
        this.props.dispatch(changeData(data));
    }

    delete(id) {
        this.props.dispatch(deleteSupplier(id, this.props.auth.token));
    }

    refresh() {
        this.props.dispatch(refreshSupplier());
    }
    render() {
        const suppliers = this.props.supplier.suppliers;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/supplier/form"
                                className="btn btn-green"
                                onClick={this.refresh.bind(this)}
                            >
                                + New Supplier
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>NAME</th>
                                        <th>ADDRESS</th>
                                        <th>PHONE</th>
                                        <th>EMAIL</th>
                                        <th>STATUS</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers.map((sup, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{sup.name}</td>
                                                <td>{sup.address}</td>
                                                <td>{sup.phone}</td>
                                                <td>{sup.email}</td>
                                                <td>
                                                    <div
                                                        className={
                                                            sup.isExists
                                                                ? "circle check"
                                                                : "circle uncheck"
                                                        }
                                                    ></div>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="/dashboard/supplier/form"
                                                        onClick={this.edit.bind(
                                                            this,
                                                            sup
                                                        )}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="pointer"
                                                        onClick={this.delete.bind(
                                                            this,
                                                            sup._id
                                                        )}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
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
        supplier: store.supplier,
        auth: store.auth
    };
};

export default connect(mapStateToProps)(DataSupplier);
