import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import CryptoDetails from "./components/CryptoDetails";
import Cryptocurrencies from "./components/Cryptocurrencies";
import News from "./components/News";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <Footer />
      </div>
    </div>
  );
}

export default App;
