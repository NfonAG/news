/**
 * Created by Vadym Yatsyuk on 23.08.17
 */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { App } from './app';
import { Top } from './top/top';
import { New } from './new/new';
import { Submit } from './submit/submit';
import { Details } from './details/details';

import './main.scss';

render(
  <BrowserRouter>
    <App>
      <Route exact={ true } path="/" component={ Top } />
      <Route exact={ true } path="/new" component={ New } />
      <Route exact={ true } path="/submit" component={ Submit } />
      <Route path="/news/:id" component={ Details } />
    </App>
  </BrowserRouter>,
  document.querySelector('#app')
);