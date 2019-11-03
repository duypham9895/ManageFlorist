import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "moment";

import {
    getDiscounts,
    changeData,
    deleteDiscount,
    refreshDiscount
} from "../../actions/discount";

class DataDiscount extends React.Component {
    componentDidMount() {
        this.props.dispatch(getDiscounts(this.props.auth.token));
    }
    edit(data) {
        data.isCreate = false;
        this.props.dispatch(changeData(data));
    }

    delete(id) {
        this.props.dispatch(deleteDiscount(id, this.props.auth.token));
    }

    refresh() {
        this.props.dispatch(refreshDiscount());
    }
    render() {
        const discounts = this.props.discount.discounts;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/discount/form"
                                className="btn btn-green"
                                onClick={this.refresh.bind(this)}
                            >
                                + New Discount
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>CODE</th>
                                        <th>EVENT</th>
                                        <th>DISCOUNT</th>
                                        <th>START DATE</th>
                                        <th>END DATE</th>
                                        <th>STATUS</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {discounts.map((dc, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{dc.code}</td>
                                                <td>{dc.event}</td>
                                                <td>{dc.percent * 100}%</td>
                                                <td>
                                                    {Moment(
                                                        dc.startDate
                                                    ).format("DD-MM-YYYY")}
                                                </td>
                                                <td>
                                                    {Moment(dc.endDate).format(
                                                        "DD-MM-YYYY"
                                                    )}
                                                </td>
                                                <td>
                                                    <div
                                                        className={
                                                            dc.isExists
                                                                ? "circle check"
                                                                : "circle uncheck"
                                                        }
                                                    ></div>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="/dashboard/discount/form"
                                                        onClick={this.edit.bind(
                                                            this,
                                                            dc
                                                        )}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="pointer"
                                                        onClick={this.delete.bind(
                                                            this,
                                                            dc._id
                                                        )}
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </span>
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
        auth: store.auth,
        discount: store.discount
    };
};

export default connect(mapStateToProps)(DataDiscount);
