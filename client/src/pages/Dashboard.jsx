import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";

import Spinner from "../layout/Spinner";
import Sidebar from "../components/layout/Sidebar.jsx";

import Home from "../components/dashboard/Home.jsx";
import Category from "../components/category/Category.jsx";
import Orders from "../components/orders/Orders.jsx";
import Customer from "../components/customer/Customer.jsx";
import Product from "../components/product/Product.jsx";
import Supplier from "../components/supplier/Supplier.jsx";
import Inventory from "../components/inventory/Inventory.jsx";
import Staff from "../components/staff/Staff.jsx";
import Discount from "../components/discount/Discount.jsx";
import Role from "../components/role/Role.jsx";

class Dashboard extends React.Component {
    render() {
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return (
            <Fragment>
                {this.props.auth.loading ? (
                    <Spinner />
                ) : (
                    <Fragment>
                        <Sidebar {...this.props.history} />
                        <Switch>
                            <Route path="/dashboard/home" component={Home} />
                            <Route path="/dashboard/order" component={Orders} />
                            <Route
                                path="/dashboard/customer"
                                component={Customer}
                            />
                            <Route
                                path="/dashboard/product"
                                component={Product}
                            />
                            <Route
                                path="/dashboard/category"
                                component={Category}
                            />
                            <Route
                                path="/dashboard/supplier"
                                component={Supplier}
                            />
                            <Route
                                path="/dashboard/inventory"
                                component={Inventory}
                            />
                            <Route path="/dashboard/staff" component={Staff} />
                            <Route
                                path="/dashboard/discount"
                                component={Discount}
                            />
                            <Route path="/dashboard/role" component={Role} />
                        </Switch>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth
    };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
