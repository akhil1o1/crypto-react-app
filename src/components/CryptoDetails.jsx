import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Spin } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

function CryptoDetails() {

    const { coinId } = useParams();
    const [ timePeriod, setTimePeriod ] = useState("7d"); 
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

    if(isFetching){
        return <div style={{height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Spin size="large"/>
    </div>
    }

    const cryptoDetails = data?.data?.coin;
    console.log(cryptoDetails);

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
    { title: 'Price to USD', value: `USD ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `USD ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `USD ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `USD ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
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
        {/* line Chart */}
    </Col>
}

export default CryptoDetails;