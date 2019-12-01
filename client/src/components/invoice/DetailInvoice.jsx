import React, { Fragment } from "react";
import PrintComponents from "react-print-components";
import DataDetailInvoice from "./DataDetailInvoice.jsx";

class DetailInvoice extends React.Component{

    render(){
        return(
            <Fragment>
                <section id="content-area">
                    <div className="col-md-12">
                        <div className="row">
                        <PrintComponents
                            trigger={<span className="btn btn-blue pointer">Print</span>}
                        >
                            <DataDetailInvoice />
                        </PrintComponents>
                        </div>
                    </div>
                </section>
                

                <DataDetailInvoice />
            </Fragment>
        )
    }
}

export default DetailInvoice;