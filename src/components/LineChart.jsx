import React from "react";
import { Line } from "react-chartjs-2";
import { Row, Col, Typography } from "antd";
import { Chart as ChartJS, registerables } from 'chart.js';
import millify from "millify";
ChartJS.register(...registerables);
const { Title } = Typography;

function LineChart({coinHistory, currentPrice, coinName}) {

    const coinPrice =[];
    const coinTimestamp = [];

    for (let i=0 ; i <coinHistory?.data?.history?.length ; i++){
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimestamp.push( new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()); //converting timestmap to date before pushing it
    }

    const data = {
        labels: coinTimestamp,
        datasets : [
            {
                label: "price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd"
            }
        ],
    };


    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

    console.log(coinHistory);

    return (<>
    <Row className="chart-header">
        <Title level={2} className="chart-title">
            {coinName} Price Chart
        </Title>
        <Col className="price-container">
            <Title level={5} className="price-change">
                {coinHistory?.data?.change} %
            </Title>
            <Title level={5} className="current-price">
                Current {coinName} Price: $ {millify(coinPrice)}
            </Title>
        </Col>
        <Line data={data} options={options}/>
    </Row>
        
    </>)
}

export default LineChart;