import React, { Fragment } from "react";
import { connect } from "react-redux";

class Category extends React.Component {
    render() {
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <a href="/#" className="btn btn-green">
                                + New Category
                            </a>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>NAME</th>
                                        <th>QTY</th>
                                        <th>STATUS</th>
                                        <th>OPTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Party</td>
                                        <td>111</td>
                                        <td>
                                            <div className="circle check"></div>
                                        </td>
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
                                        <td>2</td>
                                        <td>Family</td>
                                        <td>111</td>
                                        <td>
                                            <div className="circle uncheck"></div>
                                        </td>
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

export default connect(mapStateToProps)(Category);
