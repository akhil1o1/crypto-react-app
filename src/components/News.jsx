import React, {useState} from "react";
import { Select, Typography, Row, Col, Avatar, Card, Spin } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
const { Text } = Typography;
const { Option } = Select;

function News({simplified}) {

    const [newsCategory, SetNewsCategory] = useState("cryptocurrency");
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 100});
    console.log( cryptoNews);

    const { data } = useGetCryptosQuery(100);
    console.log(data);

    const demoImage= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0vv-Up8EOfHvg-HWFmgFcUgN3sanGDUnU-g&usqp=CAU"; 

    if(isFetching){
        return <div style={{height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Spin size="large"/>
    </div>
    }

    return <Row gutter={[24, 24]}>
    
    {simplified ? null : (<Col span={24}>
        <Select
        className="select-news"
        showSearch
        autoFocus
        placeholder="Select a Cryptocurrency"
        optionFilterProp="children"
        onChange={(value)=>SetNewsCategory(value)}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
  >
  <Option value="cryptocurrency">Cryptocurrency</Option>
    {
        data?.data?.coins?.map((currency)=>(
            <Option value={currency.name}>{currency.name}</Option>
        ))
    }
  </Select>
    </Col>) }
    <Col>
            {
                cryptoNews?.value?.map((news, index)=>(
                        <Card hoverable className="news-card" type="inner"
                        title={news.name}>
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                <Text>
                                    {
                                        news.description.length>300 ? `${news.description.substring(0, 300)}...`
                                        : `${news.description}...`
                                    }
                                </Text>
                                    <img className="news-image" style={{width:"10%", height:"10%", marginBottom:"5px"}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
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