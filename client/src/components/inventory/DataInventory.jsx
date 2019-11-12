import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getInventories } from "../../actions/inventory";
import { getReceipts } from "../../actions/receipt";

import { changeData, refreshProduct } from "../../actions/product";

class DataInventory extends React.Component {
    async componentDidMount() {
        let token = this.props.auth.token;
        await this.props.dispatch(getReceipts(token));
        await this.props.dispatch(getInventories(token));
    }
    edit(data, inventory) {
        data.isCreate = false;
        let stock;
        for (stock in inventory) {
            if (stock === "product") {
                continue;
            }
            data[stock] = inventory[stock];
        }
        this.props.dispatch(changeData(data));
    }
    refresh() {
        this.props.dispatch(refreshProduct());
    }
    render() {
        const receipts = this.props.receipt.receipts;
        const stocks = this.props.inventory.stocks;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/product/form"
                                className="btn btn-green"
                                onClick={this.refresh.bind(this)}
                            >
                                + New Product
                            </Link>
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
                                        <th>STAFF</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stocks.map((stock, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>
                                                    <img
                                                        src={
                                                            stock.product.image
                                                        }
                                                        alt=""
                                                        className="product-img"
                                                    />
                                                </td>
                                                <td>{stock.product.name}</td>
                                                <td>
                                                    {
                                                        stock.product.category
                                                            .name
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        receipts[key]
                                                            .goodsReceipt
                                                            .supplier.name
                                                    }
                                                </td>
                                                <td>{stock.qty}</td>
                                                <td>
                                                    <div
                                                        className={
                                                            !stock.isDamage
                                                                ? "circle check"
                                                                : "circle uncheck"
                                                        }
                                                    ></div>
                                                </td>
                                                <td>
                                                    {stock.product.importPrice}
                                                </td>
                                                <td>
                                                    {stock.product.sellingPrice}
                                                </td>
                                                <td>
                                                    {
                                                        receipts[key]
                                                            .goodsReceipt.member
                                                            .account.name
                                                    }
                                                </td>
                                                <td>
                                                    <Link
                                                        to="/dashboard/product/form"
                                                        onClick={this.edit.bind(
                                                            this,
                                                            stock.product,
                                                            stock
                                                        )}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {/* <tr>
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
                                        <td>duypham</td>
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
                                    </tr> */}
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
        auth: store.auth,
        inventory: store.inventory,
        receipt: store.receipt
    };
};

export default connect(mapStateToProps)(DataInventory);
