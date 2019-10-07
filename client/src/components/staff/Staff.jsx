import React, { Fragment } from "react";
import { connect } from "react-redux";

class Staff extends React.Component {
    render() {
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
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>CATEGORY</th>
                                        <th>SUPPLIER</th>
                                        <th>QTY</th>
                                        <th>STATUS</th>
                                        <th>IMPORT PRICE</th>
                                        <th>SELLING PRICE</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
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
                                    <tr>
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

export default connect(mapStateToProps)(Staff);
