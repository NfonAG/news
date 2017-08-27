/**
 * Created by Vadym Yatsyuk on 27.08.17
 */

import React from 'react';
import { Spin, Button } from 'antd';

import { NewsList } from '../news-list/news-list';
import './feed.scss';

export class Feed extends React.Component {
  constructor() {
    super();

    this.pageSize = 20;
    this.page = 0;
    this.state = {
      isLoading: false,
      news: [],
      canLoadMore: false
    };

    this.loadNews = this.loadNews.bind(this);
  }

  componentWillMount() {
    this.isLoading = true;

    this.loadNews();
  }

  set isLoading(isLoading) {
    this.setState({
      isLoading
    });
  }
  set canLoadMore(canLoadMore) {
    this.setState({
      canLoadMore
    });
  }

  loadNews() {
    this.getNews(this.page + 1)
      .then(news => {
        this.page++;
        this.isLoading = false;
        this.canLoadMore = news.length >= this.pageSize;

        this.setState({
          news: [...this.state.news, ...news]
        });
      });
  }

  render() {
    let loadMore = null;
    let spinner = null;
    const onLiked = (newsItem) => {
      return () => {
        newsItem.likes++;
      }
    };

    if (this.state.isLoading) {
      spinner = <Spin size="large" />;
    }

    if (!this.state.isLoading && this.state.canLoadMore) {
      loadMore = (
        <div className="load-more">
          <Button onClick={ this.loadNews }>Load more</Button>
        </div>
      );
    }

    return (
      <div className={ `feed-component ${ this.componentClassName }` }>
        <NewsList items={ this.state.news } onLiked={ onLiked } />
        { loadMore }
        { spinner }
      </div>
    )
  }
}