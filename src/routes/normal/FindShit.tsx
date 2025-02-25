import { Card ,Avatar} from "antd"
export default function DefaultTemplate({ celebrityList }) {
    return (<>
        <div  style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            {
                celebrityList.map((item) => {
                    return (<>
                        <Card title={item.name}>
                            <Avatar src={item.avatar}></Avatar> 
                            <div> { item.text}</div>
                        </Card>
                    </>)
                })
            }
        </div>
    </>)
}