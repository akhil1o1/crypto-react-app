import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
const { Title, Text } = Typography;
const { Option } = Select;

function News({simplified}) {

    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({newsCategory: "Cryptocurrency", count: simplified ? 6 : 100});
    console.log( cryptoNews);
    const demoImage= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0vv-Up8EOfHvg-HWFmgFcUgN3sanGDUnU-g&usqp=CAU"

    if(isFetching) return "loading....";

    return <Row gutter={[24, 24]}>
            {
                cryptoNews?.value?.map((news, index)=>(
                    <Col xs={24} sm={12} lg={8}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>{news.name}</Title>
                                    <img style={{width:"30%", height:"30%"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                                </div>
                                <Text>
                                    {
                                        news.description.length>100 ? news.description.substring(0, 100)+"..."
                                        : news.description
                                    }
                                </Text>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news provider"/>
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))
            }
    </Row>
}

export default News;