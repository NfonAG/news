/**
 * Created by Vadym Yatsyuk on 24.08.17
 */
import React from 'react';

import { NewsService } from '../news.service';
import { News } from '../news/news';

export class Top extends React.Component {
  constructor() {
    super();
    this.newsService = new NewsService();

    this.state = {
      isLoading: false,
      news: []
    };

    this.newsService.getTop()
      .then(news => {
        this.setState({
          news
        });
      });
  }

  render() {
    const news = this.state.news.map(newsItem => {
      news.push(<News key={ newsItem._id } item={ newsItem } />);
    });

    return (
      <div>
        <ul>
          { news }
        </ul>
      </div>
    )
  }
}