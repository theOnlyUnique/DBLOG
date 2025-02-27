import { Card ,Avatar,Row,Col} from "antd"
import {Typography} from "antd";
import "./shitMedia.css"
const { Text } = Typography;
export default function DefaultTemplate({ celebrityList }) {
    return (<>
        <div  style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
            <Row gutter={[16,16]}>
                {
                    // xs sm md lg xl xxl
                    celebrityList.map((item,index) => {
                        return (<>
                            <Col id={index}  xs={{ span: 12 }} md={{ span: 8 }} xl={{ span: 6}}>
                                <Card >
                                    <div style={{display: 'flex'}}>
                                        <Avatar src={item.avatar} size={{ xs: 18,  md: 24, xl: 30,  }}></Avatar> 
                                        {/* <strong style={{ marginLeft:'20px',fontSize:'25px',textOverflow: 'ellipsis',overflow:"hidden"}}>{ item.title}</strong> */}
                                        <Text ellipsis style={{ maxWidth: 200,marginTop:'2px' }} className="responsive-element">
                                            <strong>{ item.title}</strong>
                                        </Text>
                                    </div>
                                    <div style={{ maxHeight:'5rem',minHeight:'5rem',overflow:"hidden"}}> { item.text}</div>
                                </Card>
                            </Col>
                        </>)
                    })
                }
            </Row>
        </div>
    </>)
}