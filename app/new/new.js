/**
 * Created by Vadym Yatsyuk on 24.08.17
 */
import React from 'react';

import { Feed } from '../feed/feed';
import { NewsService } from '../services/news.service';

export class New extends Feed {
  constructor() {
    super();

    this.componentClassName = 'newest-component';
  }

  getNews() {
    return NewsService.getNew();
  }
}