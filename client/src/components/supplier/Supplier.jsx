import React, { Fragment } from "react";
import { connect } from "react-redux";

import { getSuppliers } from "../../actions/supplier";

class Supplier extends React.Component {
    componentDidMount() {
        this.props.dispatch(getSuppliers(this.props.auth.token));
    }
    render() {
        const suppliers = this.props.supplier.suppliers;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <a href="/#" className="btn btn-green">
                                + New Supplier
                            </a>
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

export default connect(mapStateToProps)(Supplier);
