import React, { Fragment } from "react";
import { connect } from "react-redux";

class Product extends React.Component {
    render() {
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <a href="/#" className="btn btn-green">
                                + New Product
                            </a>
                        </div>
                    </div>

                    <div className="cards">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <img
                                        src="https://res.cloudinary.com/duypham9895/image/upload/v1569165296/sample.jpg"
                                        alt=""
                                        className="product-img-list"
                                    />
                                    <span className="name">Rose</span>
                                    <hr />

                                    <div className="col-md-5">
                                        <p className="education">Category</p>
                                        <p className="education">Qty</p>
                                        <p className="education">
                                            Expiration Date
                                        </p>
                                        <p className="education">Option</p>
                                    </div>
                                    <div className="col-md-7">
                                        <p className="schools">Party</p>
                                        <p className="schools">111</p>
                                        <p className="schools">
                                            October 30th, 2019
                                        </p>
                                        <div className="schools">
                                            <a href="/#">
                                                <i className="far fa-eye"></i>
                                            </a>
                                            <a href="/#">
                                                <i className="fas fa-edit"></i>
                                            </a>
                                            <a href="/#">
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="card bg-OOS">
                                    <p className="text-OOS">OUT OF STOCK</p>

                                    <p>
                                        <img
                                            src="https://res.cloudinary.com/duypham9895/image/upload/v1569165296/sample.jpg"
                                            alt=""
                                            className="product-img-list"
                                        />
                                        <span className="name">Rose</span>
                                    </p>

                                    <hr />
                                    <div className="col-md-5">
                                        <p className="education">Category</p>
                                        <p className="education">Qty</p>
                                        <p className="education">
                                            Expiration Date
                                        </p>
                                        <p className="education">Option</p>
                                    </div>
                                    <div className="col-md-7">
                                        <p className="schools">Party</p>
                                        <p className="schools">0</p>
                                        <p className="schools">
                                            October 30th, 2019
                                        </p>
                                        <div className="schools">
                                            <a href="/#">
                                                <i className="far fa-eye"></i>
                                            </a>
                                            <a href="/#">
                                                <i className="fas fa-edit"></i>
                                            </a>
                                            <a href="/#">
                                                <i className="fas fa-trash-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps)(Product);
