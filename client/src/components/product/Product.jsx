import React, { Fragment } from "react";
import { connect } from "react-redux";

class Product extends React.Component {
    render() {
        return (
            <Fragment>
                <section id="content-area">
                    <div class="col-md-12">
                        <div class="row">
                            <a href="#" class="btn btn-green">
                                + New Product
                            </a>
                        </div>
                    </div>

                    <div class="cards">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <img
                                        src="https://res.cloudinary.com/duypham9895/image/upload/v1569165296/sample.jpg"
                                        alt=""
                                        class="product-img-list"
                                    />
                                    <span class="name">Rose</span>
                                    <hr />

                                    <div class="col-md-5">
                                        <p class="education">Category</p>
                                        <p class="education">Qty</p>
                                        <p class="education">Expiration Date</p>
                                        <p class="education">Option</p>
                                    </div>
                                    <div class="col-md-7">
                                        <p class="schools">Party</p>
                                        <p class="schools">111</p>
                                        <p class="schools">
                                            October 30th, 2019
                                        </p>
                                        <div class="schools">
                                            <a href="#">
                                                <i class="far fa-eye"></i>
                                            </a>
                                            <a href="#">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <a href="#">
                                                <i class="fas fa-trash-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="card bg-OOS">
                                    <p class="text-OOS">OUT OF STOCK</p>

                                    <p>
                                        <img
                                            src="https://res.cloudinary.com/duypham9895/image/upload/v1569165296/sample.jpg"
                                            alt=""
                                            class="product-img-list"
                                        />
                                        <span class="name">Rose</span>
                                    </p>

                                    <hr />
                                    <div class="col-md-5">
                                        <p class="education">Category</p>
                                        <p class="education">Qty</p>
                                        <p class="education">Expiration Date</p>
                                        <p class="education">Option</p>
                                    </div>
                                    <div class="col-md-7">
                                        <p class="schools">Party</p>
                                        <p class="schools">0</p>
                                        <p class="schools">
                                            October 30th, 2019
                                        </p>
                                        <div class="schools">
                                            <a href="#">
                                                <i class="far fa-eye"></i>
                                            </a>
                                            <a href="#">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            <a href="#">
                                                <i class="fas fa-trash-alt"></i>
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
