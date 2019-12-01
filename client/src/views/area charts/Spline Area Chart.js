import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import { connect } from "react-redux";
import { getInvoices } from "../../actions/invoice";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class SplineAreaChart extends Component {
	async componentDidMount() {
        let token = this.props.auth.token;
        await this.props.dispatch(getInvoices(token));
    }
	render() {
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Money by Month of Year in Sunshine Flower"
			},
			axisY: {
				title: "Money",
				includeZero: false,
				suffix: " VND"
			},
			axisX: {
				title: "Month of Year",
				prefix: " M",
				interval: 1
			},
			data: [{
				type: "splineArea",
				toolTipContent: "Month {x}: {y} VND",
				// xValueFormatString: "YYYY",
				// yValueFormatString: "#,##0.## bn kW⋅h",
				dataPoints: [
					{ x: 1, y: 0 },
					{ x: 2, y: 0 },
					{ x: 3, y: 0 },
					{ x: 4, y: 0 },
					{ x: 5, y: 0 },
					{ x: 6, y: 0 },
					{ x: 7, y: 0 },
					{ x: 8, y: 0 },
					{ x: 9, y: 0 },
					{ x: 10, y: 0 },
					{ x: 11, y: 0 },
					{ x: 12, y: 0 }
				]
			}]
		}

		const invoices = this.props.invoice.invoices;
		if(invoices.length > 0){
			for (let i = 0; i < invoices.length; i++){
				for(let j = 0; j < options.data[0].dataPoints.length; j++){
					if( new Date(invoices[i].dateCreate).getMonth() === options.data[0].dataPoints[j].x ){
						options.data[0].dataPoints[j].y += invoices[i].total;
					}
				}
			}
		}
		
		return (
		<div>
			<h1>STATISTIC INVOICES</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

const mapStateToProps = store => {
    return {
		auth: store.auth,
		invoice: store.invoice
    };
};

export default connect(mapStateToProps)(SplineAreaChart);