/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import { Button } from 'antd';

import { NewsService } from '../services/news.service';
import { CommentForm } from '../comment-form/comment-form';
import { Comment } from '../comment/comment';
import { News } from '../news/news';
import { StorageService } from '../services/storage.service';
import './details.scss';

export class Details extends React.Component {
  constructor() {
    super();

    this.pageSize = 20;
    this.page = 0;
    this.state = {
      item: null,
      comments: [],
      isLoading: false,
      isLoadingComments: false,
      canLoadMore: false
    };

    this.like = this.like.bind(this);
    this.onSentNewComment = this.onSentNewComment.bind(this);
    this.onLike =  this.onLike.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  componentWillMount() {
    this.getNewsItem(this.props.match.params.id);
    this.getComments();
  }

  getNewsItem(id) {
    this.isLoading = true;

    NewsService.getById(id)
      .then(news => {
        this.setState({
          item: news,
          isLoading: false
        });
      })
      .catch(e => {

      });
  }

  getComments() {
    this.isLoadingComments = true;
    NewsService.getComments(this.props.match.params.id, this.page + 1)
      .then(res => {
        this.page++;

        this.setState({
          comments: [...this.state.comments, ...res]
        });
        this.isLoadingComments = false;
        this.canLoadMore = res.length >= this.pageSize;
      })
  }

  like() {
    this.inProgress = true;
    let liked = StorageService.getLiked();

    if (liked.indexOf(this.state.item._id) !== -1) {
      this.inProgress = false;
      return;
    }

    NewsService
      .like(this.state.item._id)
      .then(() => {
        liked.push(this.state.item._id);
        StorageService.liked = liked;
        this.inProgress = false;
      });
  }

  set isLoading(isLoading) {
    this.setState({
      isLoading
    });
  }

  set inProgress(inProgress) {
    this.setState({
      inProgress
    });
  }

  set isLoadingComments(isLoadingComments) {
    this.setState({
      isLoadingComments
    });
  }

  set canLoadMore(canLoadMore) {
    this.setState({
      canLoadMore
    });
  }

  onSentNewComment(newComment) {
    this.setState({
      comments: [...this.state.comments, newComment],
      item: Object.assign({}, this.state.item, { comments: this.state.item.comments + 1 })
    });
  }

  onLike() {
    this.setState({
      item: Object.assign({}, this.state.item, { likes: this.state.item.likes + 1})
    });
  }

  render() {
    let details = '';

    if (!this.state.isLoading && this.state.item) {
      let comments = null;
      let loadMore = null;

      if (this.state.comments.length) {
        comments = this.state.comments.map(comment => {
          return <Comment key={ comment._id } comment={ comment } />
        });
      }

      if (this.state.canLoadMore) {
        loadMore = (
          <div className="load-more">
            <Button onClick={ this.getComments }>Load more</Button>
          </div>
        );
      }

      details = (
        <div>
          <News item={ this.state.item } onLiked={ this.onLike } />
          <div>
            <CommentForm newsId={ this.state.item._id } onSent={ this.onSentNewComment } />
          </div>
          <div>
            { comments }
          </div>
          { loadMore }
        </div>
      )
    }

    return (
      <div className="detail-component">
        { details }
      </div>
    );
  }
}