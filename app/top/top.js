/**
 * Created by Vadym Yatsyuk on 24.08.17
 */
import React from 'react';

import { Feed } from '../feed/feed';

import './top.scss';
import { NewsService } from '../services/news.service';

export class Top extends Feed {
  constructor() {
    super();

    this.componentClassName = 'top-component';
  }

  getNews(page) {
    return NewsService.getTop(page);
  }
}