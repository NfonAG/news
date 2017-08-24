/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import { NewsService } from '../news.service';
import { Comment } from '../comment-form/comment-form';

export class Details extends React.Component {
  constructor() {
    super();

    this.state = {
      item: null,
      isLoading: false
    };

    this.newsService = new NewsService();
    this.like = this.like.bind(this);
    this.onSentNewComment = this.onSentNewComment.bind(this);
  }
  componentWillMount() {
    this.getNewsItem(this.props.match.params.id);
  }

  getNewsItem(id) {
    this.isLoading = true;

    this.newsService.getById(id)
      .then(news => {
        this.setState({
          item: news,
          isLoading: false
        });
      });
  }

  like() {
    this.inProgress = true;

    this.newsService
      .like(this.state.item._id)
      .then(() => {

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

  onSentNewComment(newComment) {
    this.setState({
      item: Object.assign({}, this.state.item, {
        comments: [...this.state.item.comments, newComment]
      })
    });
  }

  render() {
    let details = '';

    if (!this.state.isLoading && this.state.item) {
      let btnLike = <button onClick={ this.like } type="button" disabled={ this.state.inProgress }>Like</button>;

      let comments = this.state.item.comments.map(comment => {
        return <li>{ comment.content }</li>
      });

      details = (
        <div>
          <div>
            { this.state.item.title }
          </div>
          <div>
            { btnLike } { this.state.item.likes } Likes, By { this.state.item.nickname }
          </div>
          <ul>
            { comments }
          </ul>
          <div>
            <Comment newsId={ this.state.item._id } onSent={ this.onSentNewComment } />
          </div>
        </div>
      )
    }

    return (
      <div>
        { details }
      </div>
    );
  }
}