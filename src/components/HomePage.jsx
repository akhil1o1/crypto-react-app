import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Divider, Spin } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

function HomePage() {
    
    const { data, isFetching } = useGetCryptosQuery(10);

    if(isFetching){
        return <div style={{height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Spin size="large"/>
        </div>
    }
    
    const globalStats = data.data.stats;

    return <>
        <Typography.Title level={2}>Global Crypto Stats</Typography.Title>
        <Row gutter={[10, 10]}>
            <Col span={12}>
            <Statistic title="Total Cryptocurrencies" value={millify(globalStats.total)}/>
            </Col>
            <Col span={12}>
            <Statistic title="Total Exchanges" value={globalStats.totalExchanges}/>
            </Col>
            <Col span={12}>
            <Statistic title="Total Market Cap" value={`${millify(globalStats.totalMarketCap)} USD`}/>
            </Col>
            <Col span={12}>
            <Statistic title="Total 24h Volume" value={`${millify(globalStats.total24hVolume)} USD`}/>
            </Col>
            <Col span={12}>
            <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/>
            </Col>
        </Row>
        <Divider/>
        <div className="home-heading-container">
            <Typography.Title level={2} className="home-title">
            Top 10 Cryptocurrencies in the world
            </Typography.Title>
            <Typography.Title level={3} className="show-more">
            <Link to="/cryptocurrencies">show more</Link>
            </Typography.Title>
        </div>
        <Divider/>
        <Cryptocurrencies simplified={true}/>
        <Divider/>
        <div className="home-heading-container">
            <Typography.Title level={2} >
            Latest Crypto News
            </Typography.Title>
            <Typography.Title level={3} className="show-more">
            <Link to="/news">show more</Link>
            </Typography.Title>
        </div>
        <Divider/>
        <News simplified={true}/>
    </>
}

export default HomePage;