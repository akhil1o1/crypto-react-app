import React, { useState, useEffect } from "react";
import millify from "millify";
import {Link} from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

function Cryptocurrencies({simplified}) {

    const count = simplified ? 10 : 100;
    const { data : cryptosList , isFetching } = useGetCryptosQuery(count); //assigning data to cryptolist
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    console.log(cryptos);

    useEffect(()=>{
        const filteredData = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(filteredData);
        console.log("useEffect ran");
    },[cryptosList, searchTerm]);

    if(isFetching){
        return <Loader/>
    }

   console.log(searchTerm);

    return <>
        {simplified ? null : <div className="search-crypto">
            <Input autoFocus placeholder="search cryptocurrencies" onChange={(e)=> setSearchTerm(e.target.value)}/>
        </div>}
        <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
        <Link to={`/crypto/${currency.uuid}`}>
            <Card
            title={`${currency.rank}. ${currency.name}`}
            hoverable> 
            <img className="coin-image" src={currency.iconUrl} alt="coin-icon"/>
            <p>
                Price: {`${millify(currency.price)} USD`}
            </p>
            <p>
                Market cap: {`${millify(currency.marketCap)} USD`}
            </p>
            <p>
                Daily change: {millify(currency.change)}
            </p>
            </Card>
        </Link>
        </Col>
        ))}
        </Row>
    </>
}

export default Cryptocurrencies;