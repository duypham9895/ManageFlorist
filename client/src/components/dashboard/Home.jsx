import React, { Fragment } from "react";
import { connect } from "react-redux";

class Home extends React.Component {
    render() {
        return (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="heading">
                                <h1>Dashboard</h1>
                            </div>
                        </div>
                    </div>

                    <div className="cards">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="user-img"></div>
                                    <span className="name">Pham Anh Duy</span>
                                    <hr />
                                    <div className="col-md-3">
                                        <span className="education">
                                            Education
                                        </span>
                                    </div>
                                    <div className="col-md-9">
                                        <span className="schools">
                                            Green Academy
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <table>
                                <thead>
                                    <tr>
                                        <th>COMPANY</th>
                                        <th>Administrator</th>
                                        <th>END OF APPLICATION</th>
                                        <th>LOCATION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="logo">OP</span>{" "}
                                            Online Shopping
                                        </td>
                                        <td>Java Developer</td>
                                        <td>11:30 AM</td>
                                        <td>Ho Chi Minh, HCMC</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="logo">LK</span>{" "}
                                            Online Shopping
                                        </td>
                                        <td>Java Developer</td>
                                        <td>11:30 AM</td>
                                        <td>Ho Chi Minh, HCMC</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="logo">WF</span>{" "}
                                            Online Shopping
                                        </td>
                                        <td>Java Developer</td>
                                        <td>11:30 AM</td>
                                        <td>Ho Chi Minh, HCMC</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="logo">JK</span>{" "}
                                            Online Shopping
                                        </td>
                                        <td>Java Developer</td>
                                        <td>11:30 AM</td>
                                        <td>Ho Chi Minh, HCMC</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="logo">JK</span>{" "}
                                            Online Shopping
                                        </td>
                                        <td>Java Developer</td>
                                        <td>11:30 AM</td>
                                        <td>Ho Chi Minh, HCMC</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="logo">JK</span>{" "}
                                            Online Shopping
                                        </td>
                                        <td>Java Developer</td>
                                        <td>11:30 AM</td>
                                        <td>Ho Chi Minh, HCMC</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="logo">JK</span>{" "}
                                            Online Shopping
                                        </td>
                                        <td>Java Developer</td>
                                        <td>11:30 AM</td>
                                        <td>Ho Chi Minh, HCMC</td>
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

export default connect(mapStateToProps)(Home);
