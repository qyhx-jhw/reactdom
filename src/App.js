import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route,
  Link
} from "react-router-dom";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import './assets/css/App.css'

import LoginFrom from './components/Login'
import RegistrationForm from './components/Register'
import Home from './components/Home'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <div>
            
          <header>
              <ul>
                <li><Link to="/login">登录</Link> </li>
                <li><Link to="/register">注册</Link></li>
                <li><Link to="/">主页</Link></li>
              </ul>
              <hr />
            </header>

            <Route exact path="/login" component={LoginFrom}></Route>
            {/* <Route exact path="/register" component={RegistrationForm}></Route> */}
            <Route exact path="/register" >
              <RegistrationForm/>
            </Route>

            <Route exact path="/" component={Home}></Route>
            {/* <Route exact path="/home" component={Home}></Route> */}

          </div>
        </Router>

      </ConfigProvider>

    );
  }
}

export default App;
