import React, { Component } from 'react';
import { Calendar, Result, Row, Col, Button } from 'antd';
import userServer from '../../service/userServer'
import moment from 'moment';
// import { values } from 'mobx';
// import { render } from 'react-dom';
import { observer } from 'mobx-react'

class Check extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:''
        };
    }

    post_time = (time) => {
        console.log('时间', time)
        this.setState({
            value:time
        })
        userServer.post_check_in(time)
    }

    returnm = (value) => {
        if (userServer.time) {
            return <Result
                style={{ width: 300 }}
                status="success"
                title="打卡成功"
                subTitle={`"时间：" ${moment(value).format('YYYY-MM-DD')}`}
                extra={[
                ]}
            />
        } else {
            return <Result
                style={{ width: 300 }}
                status="warning"
                title="请签到"
                subTitle={`"时间：" ${moment().format('YYYY-MM-DD')}`}
                extra={[
                ]}
            />
        }

    }
    render() {
        // const { value, selectedValue } = this.state;
        // console.log()
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <div
                            style={{
                                width: 600,
                                border: '3px solid #d9d9d9',
                                borderRadius: 4
                            }}>
                            打卡签到
                            {/* <Alert
                                message={`你选择的时间: ${selectedValue.format('YYYY-MM-DD')}`}
                            /> */}
                            <Calendar
                                // onSelect={this.onSelect}
                                fullscreen={true}
                                // onPanelChange={this.onPanelChange}
                                style={{ width: 600 }} />
                        </div>
                    </Col>
                    <Col span={12}>
                        {/* <Result
                            style={{ width: 300 }}
                            status="success"
                            title="成功登录人事管理系统"
                            subTitle={`"登录时间：" ${moment().format('MMMM Do , h:mm:ss a')}`}
                            extra={[
                            ]}
                        /> */}
                        {this.returnm(this.state.value)}
                        <Button type="primary" onClick={a=>this.post_time(moment().format('YYYY-MM-DD'))}>点击签到</Button>
                    </Col>
                </Row>

            </div>
        );
    }
}
// import { observer } from 'mobx-react'

export default  observer(Check) ;