import React, { Fragment } from "react";
import { connect } from "react-redux";

class Statistical extends React.Component{
    render(){
        return(
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <h1>Statistical</h1>
                    </div>
                </section>
            </Fragment>
        )
    }
}

const mapStateToProps = store => {
    return {
        auth: store.auth,
        iv: store.invoice
    };
};

export default connect(mapStateToProps)(Statistical);