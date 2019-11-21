import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";
import { getUser } from "../../actions/user";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: {
                home: "",
                orders: "",
                customer: "",
                product: "",
                category: "",
                supplier: "",
                inventory: "",
                staff: "",
                discount: "",
                role: "",
                profile: "",
                invoice: ""
            },
            count: false
        };
    }

    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async active(value, e) {
        let token = this.props.auth.token;
        let id = this.props.auth.id;

        if (value === "logout") {
            return this.props.dispatch(logout(token, this.props.history));
        }

        if (value === "profile") {
            this.props.dispatch(getUser(token, id));
        }
        let temp;
        let active = { ...this.state.active };

        for (temp in active) {
            active[temp] = "";
        }

        for (temp in active) {
            if (temp === value) {
                active[temp] = "active";
            }
        }

        this.setState({
            active: active
        });
    }

    async componentDidMount() {
        await this.props.dispatch(
            getUser(this.props.auth.token, this.props.auth.id)
        );
        let str = this.props.location.pathname.split("/");
        let target = str[str.indexOf("dashboard") + 1];

        if (this.state.active[target] === undefined) {
            this.setState({
                active: {
                    ...this.state.active,
                    home: "active"
                }
            });
        }
        this.setState({
            active: {
                ...this.state.active,
                [target]: "active"
            }
        });
    }

    refreshPage() {
        let count = this.state.count;
        if (!count) {
            window.location.reload();
        } else {
        }
        this.setState({
            ...this.state,
            count: true
        });
    }
    render() {
        const active = this.state.active;
        const role = this.props.auth.role;

        return (
            <Fragment>
                <section id="sideMenu">
                    <nav>
                        <Link
                            onClick={this.active.bind(this, "home")}
                            to="/dashboard/home"
                            className={active.home}
                        >
                            <i className="fas fa-tachometer-alt"></i>Dashboard
                        </Link>
                        <Link
                            onClick={this.active.bind(this, "orders")}
                            to="/dashboard/orders"
                            className={active.orders}
                        >
                            <i className="fas fa-list"></i>Orders
                        </Link>

                        <Link
                            onClick={this.active.bind(this, "invoice")}
                            to="/dashboard/invoice/data"
                            className={active.invoice}
                        >
                            <i className="fas fa-file-invoice-dollar"></i>
                            Invoice
                        </Link>

                        <Link
                            onClick={this.active.bind(this, "customer")}
                            to="/dashboard/customer/data"
                            className={active.customer}
                        >
                            <i className="fas fa-user-tie"></i>Customer
                        </Link>

                        <Link
                            onClick={this.active.bind(this, "product")}
                            to="/dashboard/product/data"
                            className={active.product}
                        >
                            <i className="fas fa-shopping-cart"></i>Product
                        </Link>

                        <Link
                            onClick={this.active.bind(this, "inventory")}
                            to="/dashboard/inventory/data"
                            className={active.inventory}
                        >
                            <i className="fas fa-warehouse"></i>Inventory
                        </Link>

                        <Link
                            onClick={this.active.bind(this, "profile")}
                            className={active.profile + " pointer"}
                            to="/dashboard/profile/form"
                        >
                            <i className="fas fa-user-alt"></i>
                            Profile
                        </Link>

                        {role !== "ADMIN" ? (
                            ""
                        ) : (
                            <Fragment>
                                <Link
                                    onClick={this.active.bind(this, "discount")}
                                    to="/dashboard/discount/data"
                                    className={active.discount}
                                >
                                    <i className="fas fa-percent"></i>Discount
                                </Link>
                                <Link
                                    onClick={this.active.bind(this, "category")}
                                    to="/dashboard/category/data"
                                    className={active.category}
                                >
                                    <i className="fas fa-clipboard-list"></i>
                                    Category
                                </Link>
                                <Link
                                    onClick={this.active.bind(this, "supplier")}
                                    to="/dashboard/supplier/data"
                                    className={active.supplier}
                                >
                                    <i className="fas fa-address-book"></i>
                                    Supplier
                                </Link>
                                <Link
                                    onClick={this.active.bind(this, "staff")}
                                    to="/dashboard/staff/data"
                                    className={active.staff}
                                >
                                    <i className="fas fa-users"></i>Staff
                                </Link>

                                <Link
                                    onClick={this.active.bind(this, "role")}
                                    to="/dashboard/role/data"
                                    className={active.role}
                                >
                                    <i className="fas fa-user-shield"></i>
                                    Role
                                </Link>
                            </Fragment>
                        )}

                        <Link
                            onClick={this.active.bind(this, "logout")}
                            to="/#"
                        >
                            <i className="fas fa-sign-out-alt"></i>Sign Out
                        </Link>
                    </nav>
                </section>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth,
        user: store.user
    };
};

export default connect(mapStateToProps)(Sidebar);
