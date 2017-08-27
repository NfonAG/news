/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import  './header.scss';

const AntdHeader = Layout.Header;

export class Header extends React.Component {
  static propTypes = {
    router: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      selectedKeys: []
    }
  }

  render() {
    return (
      <AntdHeader className="layout-header">
        <div>
          <span className="logo">
            <NavLink to="/">NEWS</NavLink>
          </span>
          <Menu theme="light"
                mode="horizontal"
                style={{ lineHeight: '64px' }}
                selectedKeys={[window.location.pathname]}
          >
              <Menu.Item key="/">
                <NavLink to="/" exact activeClassName="active">
                  Top
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/new">
                <NavLink to="/new" exact activeClassName="active">New</NavLink>
              </Menu.Item>
              <Menu.Item key="/submit">
                <NavLink to="/submit" exact activeClassName="active">Submit</NavLink>
              </Menu.Item>
          </Menu>
        </div>
      </AntdHeader>
    );
  }
}