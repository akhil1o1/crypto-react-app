import React, { useState } from "react";
import millify from "millify";
import {Link} from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

function Cryptocurrencies() {

    const { data : cryptoList , isFetching } = useGetCryptosQuery();
    const {cryptos, setCryptos} = useState(cryptoList.data.coins);
    if(isFetching) return <h1>loading......</h1>;

    return <>
        <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
        <Link to={`crypto/${currency.uuid}`}>
            <Card
            title={`${currency.rank}. ${currency.name}`}
            extra={<img src={currency.iconUrl} alt="coin icon"/>}
            hoverable> 
            <Typography.paragraph>
                Price: {millify(currency.price)}
            </Typography.paragraph>
            <Typography.paragraph>
                Market cap: {millify(currency.marketCap)}
            </Typography.paragraph><Typography.paragraph>
                Daily change: {millify(currency.change)}
            </Typography.paragraph>

            </Card>
        </Link>
        </Col>
        ))}
        
        </Row>
    </>
}

export default Cryptocurrencies;