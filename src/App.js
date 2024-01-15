import React, {Component} from 'react';
import {Provider} from "react-redux";
import { Layout } from 'antd';

import Products from './components/Products';
import Toolbar from "./components/Toolbar";
import store from "./store";
import 'antd/dist/antd.css';
import './App.css';

const { Header, Footer, Content } = Layout;
class App extends Component{

  render() {
    return (
        <div className="App">
            <Provider store={store}>
                <Layout>
                    <Header className="header">
                        <Toolbar />
                    </Header>
                    <div id="between-head-body"> </div>
                    <div id="body">
                    <Content className="content">
                        <Products />
                    </Content>
                    </div>
                    <Footer style={{backgroundColor: '#ffffff'}}/>
                </Layout>
            </Provider>
        </div>
    );
  }
}

export default App;
