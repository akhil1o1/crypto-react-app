import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

function HomePage() {
    
    const { data, isFetching } = useGetCryptosQuery(10);

    if(isFetching){
        return <h1>loading......</h1>
    }
    
    const globalStats = data.data.stats;

    return <>
        <Typography.Title level={2}>Global Crypto Stats</Typography.Title>
        <Row gutter={[10, 10]}>
            <Col span={12}>
            <Card><Statistic title="Total Cryptocurrencies" value={millify(globalStats.total)}/></Card>
            </Col>
            <Col span={12}>
            <Card><Statistic title="Total Exchanges" value={globalStats.totalExchanges}/></Card>
            </Col>
            <Col span={12}>
            <Card><Statistic title="Total Market Cap" value={`${millify(globalStats.totalMarketCap)} USD`}/></Card>
            </Col>
            <Col span={12}>
            <Card><Statistic title="Total 24h Volume" value={`${millify(globalStats.total24hVolume)} USD`}/></Card>
            </Col>
            <Col span={12}>
            <Card><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Card>
            </Col>
        </Row>
        <div className="home-heading-container">
            <Typography.Title level={2} className="home-title">
            Top 10 Cryptocurrencies in the world
            </Typography.Title>
            <Typography.Title level={3} className="show-more">
            <Link to="/cryptocurrencies">show more</Link>
            </Typography.Title>
        </div>
        <Cryptocurrencies simplified={true}/>
        <div className="home-heading-container">
            <Typography.Title level={2} >
            Latest Crypto News
            </Typography.Title>
            <Typography.Title level={3} className="show-more">
            <Link to="/news">show more</Link>
            </Typography.Title>
        </div>
        <News simplified={true}/>
    </>
}

export default HomePage;