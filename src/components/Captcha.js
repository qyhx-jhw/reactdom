import React, { Component } from 'react';
// import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Form, Button, } from 'antd';

var script = document.createElement('script');
script.type = 'text/javascript';
script.async = true;
script.src = 'https://ssl.captcha.qq.com/TCaptcha.js';
document.head.appendChild(script);



window.callback = function (res) {
    // console.log(res)
    // res（用户主动关闭验证码）= {ret: 2, ticket: null}
    // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
    if (res.ret === 0) {
        console.log(res.ticket)
        alert('验证成功')   // 票据
    }
}

class Captcha extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        };
    }
    // componentWillMount() {
    //     var script = document.createElement('script');
    //     script.type = 'text/javascript';
    //     script.async = true;
    //     script.src = 'https://ssl.captcha.qq.com/TCaptcha.js';
    //     document.head.appendChild(script);

    // }
    UNSAFE_componentWillMount() {
        // window.callback = function (res) {
        //     // console.log(res)
        //     // res（用户主动关闭验证码）= {ret: 2, ticket: null}
        //     // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
        //     if (res.ret === 0) {
        //         console.log(res.ticket)
        //         alert('验证成功')   // 票据
        //     }
        // }
        
        this.setState({ id: this.props.id })
    }

    render() {
        // console.log('111', this.props.ID1)
        console.log('222', this.state.id)
        
        return (

            <div >
                {/* <Button >
                    <div id='TencentCaptcha' data-appid="2045031709"
                    data-cbfn="callback"
                    >获取验证码</div>
                </Button> */}
                <Form.Item>
                    <Button
                        type="dashed"
                        // id='TencentCaptcha'
                        id={this.state.id}
                        data-appid="2015130461"
                        data-cbfn="callback"
                        className="login-form-button"
                        // key={this.state.id}
                    >
                        获取验证码{this.state.id}
                        </Button>
                </Form.Item>
            </div>
        );
    }
}


export default Captcha;