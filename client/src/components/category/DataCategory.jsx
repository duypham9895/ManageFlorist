import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "moment";

import {
    getCategories
    // changeData,
    // deleteSupplier,
    // refreshSupplier
} from "../../actions/category";

class DataCategory extends React.Component {
    componentDidMount() {
        this.props.dispatch(getCategories(this.props.auth.token));
    }
    render() {
        const categories = this.props.category.categories;
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <Link
                                to="/dashboard/category/form"
                                className="btn btn-green"
                            >
                                + New Category
                            </Link>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>NAME</th>
                                        <th>DATE CREATE</th>
                                        <th>STATUS</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((ct, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{ct.name}</td>
                                                <td>
                                                    {Moment(
                                                        ct.date_create
                                                    ).format("DD-MM-YYYY")}
                                                </td>
                                                <td>
                                                    <div
                                                        className={
                                                            ct.isExists
                                                                ? "circle check"
                                                                : "circle uncheck"
                                                        }
                                                    ></div>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="/dashboard/category/form"
                                                        // onClick={this.edit.bind(
                                                        //     this,
                                                        //     sup
                                                        // )}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>
                                                    <span
                                                        className="pointer"
                                                        // onClick={this.delete.bind(
                                                        //     this,
                                                        //     sup._id
                                                        // )}
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
        category: store.category
    };
};

export default connect(mapStateToProps)(DataCategory);
