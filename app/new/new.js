/**
 * Created by Vadym Yatsyuk on 24.08.17
 */
import React from 'react';

import { NewsService } from '../news.service';
import { NewsList } from '../news-list/news-list';

export class New extends React.Component {
  constructor() {
    super();
    this.newsService = new NewsService();

    this.state = {
      isLoading: false,
      news: []
    };

    this.newsService.getNew()
      .then(news => {
        this.setState({
          news
        });
      });
  }

  render() {
    return (
      <div>
        <NewsList items={ this.state.news } />
      </div>
    )
  }
}