import React from "react";
import { line } from "react-chartjs-2";
import { Row, Col, Typography } from "antd";
const { Title } = Typography;

function LineChart({coinHistory, coinPrice, coinName}) {

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
                Current {coinName} Price: $ {coinPrice}
            </Title>
        </Col>
    </Row>
        
    </>)
}

export default LineChart;