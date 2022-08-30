import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
const { Text } = Typography;
const { Option } = Select;

function News({simplified}) {

    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({newsCategory: "Cryptocurrency", count: simplified ? 6 : 100});
    console.log( cryptoNews);
    const demoImage= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0vv-Up8EOfHvg-HWFmgFcUgN3sanGDUnU-g&usqp=CAU"

    if(isFetching) return "loading....";

    return <Row gutter={[24, 24]}>
    <Col>
            {
                cryptoNews?.value?.map((news, index)=>(
                    
                        <Card hoverable className="news-card" type="inner"
                        title={news.name}>
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                <Text>
                                    {
                                        news.description.length>300 ? news.description.substring(0, 300)+"..."
                                        : news.description
                                    }
                                </Text>
                                    <img className="news-image" style={{width:"10%", height:"10%"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                                </div>
                                
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news provider"/>
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                ))
            }
            </Col>
    </Row>
}

export default News;