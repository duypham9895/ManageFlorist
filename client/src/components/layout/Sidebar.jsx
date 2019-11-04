import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";

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
                role: ""
            }
        };
    }
    active(value, e) {
        if (value === "logout") {
            return this.props.dispatch(
                logout(this.props.auth.token, this.props.history)
            );
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

    componentDidMount() {
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
    render() {
        const active = this.state.active;
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
                            onClick={this.active.bind(this, "customer")}
                            to="/dashboard/customer"
                            className={active.customer}
                        >
                            <i className="fas fa-user-tie"></i>Customer
                        </Link>
                        <Link
                            onClick={this.active.bind(this, "discount")}
                            to="/dashboard/discount/data"
                            className={active.discount}
                        >
                            <i className="fas fa-percent"></i>Discount
                        </Link>
                        <Link
                            onClick={this.active.bind(this, "product")}
                            to="/dashboard/product/data"
                            className={active.product}
                        >
                            <i className="fas fa-shopping-cart"></i>Product
                        </Link>
                        <Link
                            onClick={this.active.bind(this, "category")}
                            to="/dashboard/category/data"
                            className={active.category}
                        >
                            <i className="fas fa-clipboard-list"></i>Category
                        </Link>
                        <Link
                            onClick={this.active.bind(this, "supplier")}
                            to="/dashboard/supplier/data"
                            className={active.supplier}
                        >
                            <i className="fas fa-address-book"></i>Supplier
                        </Link>

                        <Link
                            onClick={this.active.bind(this, "inventory")}
                            to="/dashboard/inventory/data"
                            className={active.inventory}
                        >
                            <i className="fas fa-warehouse"></i>Inventory
                        </Link>
                        <Link
                            onClick={this.active.bind(this, "staff")}
                            to="/dashboard/staff"
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
        auth: store.auth
    };
};

export default connect(mapStateToProps)(Sidebar);
