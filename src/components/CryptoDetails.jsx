import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Typography, Select, Spin, Divider, Row } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, SwapOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined, RetweetOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoPriceHistoryQuery } from '../services/cryptoApi';

import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {

    const { coinId } = useParams();
    const [ timePeriod, setTimePeriod ] = useState("7d"); 
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data : coinHistory } = useGetCryptoPriceHistoryQuery({timePeriod, coinId}); 

    if(isFetching){
        return <div style={{height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Spin size="large"/>
    </div>
    }

    const cryptoDetails = data?.data?.coin;
    console.log(cryptoDetails);

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <CheckCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.supply.total)}`, icon: <SwapOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.supply.circulating)}`, icon: <RetweetOutlined /> },
    ];
    

    return <Col className='coin-datail-container'>
        <Col className="coin-heading-container" >
            <Title level={2} className="coin-name">
                {cryptoDetails.name} ({cryptoDetails.symbol}) price
            </Title>
            <Text>
                {cryptoDetails.name} live price in US dollars. View value statistics, market cap and supply.
            </Text>
        </Col>
        <Select
        className="select-timeperiod"
        placeholder="Select time period"
        onChange={(value) => setTimePeriod(value)}
        >
        {
            time.map((period) => <Option key={period} value={period}>{period}</Option>)
        }
        </Select>
        <Divider/>
        <LineChart coinHistory={coinHistory} coinPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
        <Col className="stats-container">
            <Col className="coin-value-statistics">
                <Col className="coin-value-statistics-heading">
                    <Title level={3} className="coin-details-heading">
                        {cryptoDetails.name} Value Statisitics
                    </Title>
                    <Text>
                        An overview showing stats of the {cryptoDetails.name}
                    </Text>
                </Col>
                {stats.map(({icon, title, value}) =>(
                    <Col className="coin-stats">
                        <Col className="coin-stats-name">
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className="stats">{value}</Text>
                    </Col>
                ))}
            </Col>
            <Col className="other-stats-info">
                <Col className="coin-value-statistics-heading">
                    <Title level={3} className="coin-details-heading">
                        Other {cryptoDetails.name} stats
                    </Title>
                    <Text>
                        Market, availability and circulation stats
                    </Text>
                </Col>
                {genericStats.map(({icon, title, value}) =>(
                    <Col className="coin-stats">
                        <Col className="coin-stats-name">
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className="stats">{value}</Text>
                    </Col>
                ))}
            </Col>
        </Col>
        <Col className="coin-desc-link">
            <Col className="coin-desc">
                <Title level={3} className="coin-details-heading">
                    What is {cryptoDetails.name} ?
                </Title>
                {HTMLReactParser(cryptoDetails.description)}
            </Col>
            <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">
                        Useful {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links.map((link) =>(
                        <Row className="coin-link" key={link.name}>
                            <Title level={5} className="link-name">{link.type}</Title>
                            <a href={link.url} target="_blank" rel="noreferrer">
                                {link.name}
                            </a>
                        </Row>
                    ))}
            </Col>
        </Col>
    </Col>
}

export default CryptoDetails;