import React, { Fragment } from "react";
import { connect } from "react-redux";

import { getSuppliers } from "../../actions/supplier";

class Supplier extends React.Component {
    componentDidMount() {
        this.props.dispatch(getSuppliers());
    }
    render() {
        console.log(this.props.supplier.suppliers);
        return (
            <Fragment>
                <section id="content-area">
                    <div class="col-md-12">
                        <div class="row">
                            <a href="#" class="btn btn-green">
                                + New Supplier
                            </a>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="row">
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
                                    <tr>
                                        <td>1</td>
                                        <td>ABC</td>
                                        <td>HCM City</td>
                                        <td>123456789</td>
                                        <td>
                                            <div class="circle check"></div>
                                        </td>
                                        <td>
                                            <a href="#">
                                                <i class="far fa-eye"></i>
                                            </a>
                                            <a href="#">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <a href="#">
                                                <i class="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>XYZ</td>
                                        <td>DaNang City</td>
                                        <td>987654321</td>
                                        <td>
                                            <div class="circle uncheck"></div>
                                        </td>
                                        <td>
                                            <a href="#">
                                                <i class="far fa-eye"></i>
                                            </a>
                                            <a href="#">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <a href="#">
                                                <i class="fas fa-trash-alt"></i>
                                            </a>
                                        </td>
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
        supplier: store.supplier
    };
};

export default connect(mapStateToProps)(Supplier);
