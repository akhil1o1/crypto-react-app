import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";

function HomePage() {
    return <>
        <Typography.Title level={2}>Global Crypto Stats</Typography.Title>
        <Row>
            <Col span={12}><Statistic title="Total Cryptocurrencies" value={4}/></Col>
            <Col span={12}><Statistic title="Total Exchanges" value={4}/></Col>
            <Col span={12}><Statistic title="Total Market Cap" value={4}/></Col>
            <Col span={12}><Statistic title="Total 24h Volume" value={4}/></Col>
            <Col span={12}><Statistic title="Total Markets" value={4}/></Col>
        </Row>
    </>
}

export default HomePage;