/**
 * Created by Vadym Yatsyuk on 24.08.17
 */
import React from 'react';
import { Spin } from 'antd';

import { NewsService } from '../news.service';
import { NewsList } from '../news-list/news-list';

export class Top extends React.Component {
  constructor() {
    super();
    this.newsService = new NewsService();

    this.state = {
      isLoading: false,
      news: []
    };
  }

  componentWillMount() {
    this.getTopNews();
  }

  getTopNews() {
    this.isLoading = true;

    this.newsService.getTop()
      .then(news => {
        this.isLoading = false;

        this.setState({
          news
        });
      });
  }

  set isLoading(isLoading) {
    this.setState({
      isLoading
    });
  }

  render() {
    let spinner = null;
    const onLiked = (newsItem) => {
      return () => {
        newsItem.likes++;
      }
    };

    if (this.state.isLoading) {
      spinner = <Spin size="large" />;
    }

    return (
      <div className="top-component">
        <NewsList items={ this.state.news } onLiked={ onLiked } />
        { spinner }
      </div>
    )
  }
}