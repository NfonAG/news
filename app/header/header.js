/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

export class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>News</h1>
        <NavLink to="/" exact activeClassName="active">Top</NavLink>
        <NavLink to="/new" exact activeClassName="active">New</NavLink>
        <NavLink to="/submit" exact activeClassName="active">Submit</NavLink>
      </header>
    );
  }
}