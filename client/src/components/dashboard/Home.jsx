import React, { Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Sidebar";

import LineChart from '../../views/line charts/Line Chart';
import SplineAreaChart from '../../views/area charts/Spline Area Chart';



class Home extends React.Component {
    render() {
        const auth = this.props.auth;

        // return <Spinner />;

        return auth.loading && auth.token === null ? (
            <Spinner />
        ) : (
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="heading">
                                <h1>Dashboard</h1>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div>
                            <LineChart />
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div>
                            <SplineAreaChart />
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
