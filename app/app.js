/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import { Layout } from 'antd';

import './app.scss';
import { Header } from './header/header';

export class App extends React.Component {
  render() {


    return (
      <Layout className="layout app-component">
        <Header />
        <Layout.Content>
          { this.props.children }
        </Layout.Content>
      </Layout>
    );
  }
}