import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route,
  Link
} from "react-router-dom";
import { ConfigProvider, Layout, Menu } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import './assets/css/App.css'

import LoginFrom from './components/Login'
import RegistrationForm from './components/Register'
import Home from './components/Home'

const { Header } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Header style={{ height: '35px' }}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '34px' }}
            >
              <Menu.Item key="1"><Link to="/login">登录</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/register">注册</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/">主页</Link></Menu.Item>
            </Menu>
          </Header>
          <Route exact path="/login" component={LoginFrom}></Route>
          <Route path="/register" ><RegistrationForm /></Route>
          <Route exact path="/" component={Home}></Route>

        </Router>
      </ConfigProvider>

    );
  }
}

export default App;
