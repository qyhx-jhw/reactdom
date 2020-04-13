import React, { Component } from 'react';
import { Layout, Menu, Icon, Result } from 'antd';
// import Check_in from './model/Check_in'
import User from './model/User'
import Payroll from './model/Payroll'
import Holiday from './model/Holiday'
import url from 'url'
import IMG from '../assets/images/lt.jpg'
import store from 'store'
import {
    BrowserRouter as Router, Route,
    Redirect,
    Link
} from "react-router-dom";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class result extends Component {
    render() {
        return (<Result
            status="success"
            title="Successfully Purchased Cloud Server ECS!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
            ]}
        />)
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            userid: ''
        };
    }

    componentDidMount() {
        //获取动态路由的传值
        // console.log(url.parse(this.props.location.search, true))
        var aid = url.parse(this.props.location.search, true).query;
        console.log('homd---ID', aid)
        this.setState({
            userid: aid.userid
        })
    }

    chenge = () => {
        this.state.open ? this.setState({ open: false }) : this.setState({ open: true })

    }
    render() {
        // const { open } = this.state.open
        console.log('用户id', this.state.userid)
        console.log('token的值', store.get('token'))
        if (!store.get('token')) {
            return <Redirect to='/login' />
        }

        return (
            <div>
                <Router>
                    <Layout>
                        <Sider
                            theme='dark'
                            collapsible='true'
                            width={256}
                            style={{ minHeight: '100vh' }}
                            breakpoint="sm"
                            collapsedWidth="0"
                            onBreakpoint={broken => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}
                        >
                            <div className="logo" >
                                <img src={IMG} height='42px' alt='沙漠骆驼'></img>
                            </div>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                                <Menu.Item key="1">

                                    <Icon type="smile" theme="outlined" />
                                    打卡签到
                                    <Link to={`/home/check/${this.state.open}`}></Link>

                                </Menu.Item>

                                <Menu.Item key="2" >
                                    <Icon type="user" />
                                    个人信息
                                    <Link to={`/home/user?userid=${this.state.userid}`}></Link>

                                </Menu.Item>

                                <Menu.Item key="3" >
                                    <Icon type="account-book" />
                                    薪资查询
                                    <Link to="/home/payroll"></Link>
                                </Menu.Item>

                                <Menu.Item key="4" >
                                    <Icon type="account-book" />
                                    请假申请
                                    <Link to="/home/holiday"></Link>
                                </Menu.Item>
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                            {/* <Icon type="user" /> */}
                                            <Icon type="database" />
                                            <span>管理信息</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="5">
                                        <Link to='/home/Tom'>Tom</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">Bill</Menu.Item>
                                    <Menu.Item key="7">Alex</Menu.Item>
                                </SubMenu>
                            </Menu>

                        </Sider>
                        <Layout>
                            <Header style={{
                                // background: 'rgba(37, 122, 201, 0.2)',
                                background: '#ffff',
                                textAlign: 'center', padding: 0
                            }} >

                            </Header>

                            <Content style={{ margin: '20px 16px 0' }}>

                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                                    {/* <h1>hello world</h1> */}
                                    {/* {this.state.open?<Route path="/home/check/:open" component={Check_in}></Route>:''} */}
                                    {/* <Route path="/home/check/:open" component={Check_in}></Route> */}
                                    <Route exact path="/home/user" component={User}></Route>
                                    <Route exact path="/home/holiday" component={Holiday}></Route>
                                    <Route exact path="/home/payroll" component={Payroll}></Route>
                                    <Route exact path="/home/" component={result}></Route>

                                    {/* {this.state.open ? <Check_in></Check_in> : ''} */}
                                </div>
                            </Content>

                            <Footer style={{ textAlign: 'center' }}>人事管理系统 ©2020 宁夏快乐西游</Footer>
                        </Layout>
                    </Layout>,
                    </Router>
            </div>
        );
    }
}

export default Home;