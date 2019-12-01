import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import { connect } from "react-redux";

import { getReceipts } from "../../actions/receipt";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class LineChart extends Component {
	async componentDidMount() {
        let token = this.props.auth.token;
        await this.props.dispatch(getReceipts(token));
    }
	render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
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
				type: "line",
				toolTipContent: "Month {x}: {y} VND",
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

		const receipts = this.props.receipt.receipts;
		if (receipts.length > 0 ){
			for (let i = 0; i < receipts.length; i++){
				for(let j = 0; j < options.data[0].dataPoints.length; j++){
					if( new Date(receipts[i].dateCreate).getMonth() === options.data[0].dataPoints[j].x ){
						options.data[0].dataPoints[j].y += receipts[i].goodsReceipt.total;
					}
				}
				
			}
		}
		
		
		return (
		<div>
			<h1>STATISTIC GOODS RECEIPT</h1>
			<p></p>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
		</div>
		);
	}
}

const mapStateToProps = store => {
    return {
		auth: store.auth,
		receipt: store.receipt
    };
};


export default connect(mapStateToProps)(LineChart);