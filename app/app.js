/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';

import './app.scss';
import { Header } from './header/header';

export class App extends React.Component {
  render() {


    return (
      <div className="app-component">
        <Header/>
        <section>
          { this.props.children }
        </section>
      </div>
    );
  }
}