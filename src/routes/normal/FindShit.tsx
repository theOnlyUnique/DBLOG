import { Card ,Avatar,Row,Col} from "antd"
export default function DefaultTemplate({ celebrityList }) {
    return (<>
        <div  style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <Row gutter={[16,16]}>
                {
                    celebrityList.map((item,index) => {
                        return (<>
                            <Col id={index} span={8}>
                                <Card >
                                    <div style={{display: 'flex'}}>
                                        <Avatar src={item.avatar}></Avatar> 
                                        <strong style={{ marginLeft:'20px',fontSize:'25px'}}>{ item.title}</strong>
                                    </div>
                                    <div> { item.text}</div>
                                </Card>
                            </Col>
                        </>)
                    })
                }
            </Row>
        </div>
    </>)
}