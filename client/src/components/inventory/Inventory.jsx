import React, { Fragment } from "react";
import { connect } from "react-redux";

class Inventory extends React.Component {
    render() {
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
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>CATEGORY</th>
                                        <th>SUPPLIER</th>
                                        <th>QTY</th>
                                        <th>STATUS</th>
                                        <th>IMPORT PRICE</th>
                                        <th>SELLING PRICE</th>
                                        <th>STAFF</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://res.cloudinary.com/duypham9895/image/upload/v1569165296/sample.jpg"
                                                alt=""
                                                class="product-img"
                                            />
                                        </td>
                                        <td>Rose</td>
                                        <td>Party</td>
                                        <td>ABC</td>
                                        <td>111</td>

                                        <td>
                                            <div class="circle check"></div>
                                        </td>
                                        <td>2.99</td>
                                        <td>3.5</td>
                                        <td>duypham</td>
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
                                        <td>
                                            <img
                                                src="https://res.cloudinary.com/duypham9895/image/upload/v1569165296/sample.jpg"
                                                alt=""
                                                class="product-img"
                                            />
                                        </td>
                                        <td>Rose</td>
                                        <td>Party</td>
                                        <td>ABC</td>
                                        <td>111</td>

                                        <td>
                                            <div class="circle check"></div>
                                        </td>
                                        <td>2.99</td>
                                        <td>3.5</td>
                                        <td>duypham</td>
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
        auth: store.auth
    };
};

export default connect(mapStateToProps)(Inventory);
