import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from "antd";
import Navbar from './components/Navbar';
import "./App.css";
import HomePage from "./components/HomePage";
import Exchanges from "./components/Exchanges";
import CryptoDetails from "./components/CryptoDetails";
import Cryptocurrencies from "./components/Cryptocurrencies";
import News from "./components/News";


function App() {
    return <div className="app">
        <div className="navbar">
            <Navbar />
        </div>
        <div className="main">
        <Layout>
        <div className="routes">
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/exchanges" element={<Exchanges/>}/>
            <Route path="/cryptocurrencies" element={<Cryptocurrencies/>}/>
            <Route path="/crypto/:coinId" element={<CryptoDetails/>}/>
            <Route path="/news" element={<News/>}/>
        </Routes>
        </div>
        </Layout>
        <div className="footer">
            <Typography.Title level={5} style={{color: "white", textAlign:"center"}}>
                Cryptoverse <br/>
                All right reserved
            </Typography.Title>
            <Space>
                <Link to="/">Home</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/news">News</Link>
            </Space>
        </div>
        </div>
    </div>
}

export default App; 