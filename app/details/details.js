/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import { NewsService } from '../news.service';
import { CommentForm } from '../comment-form/comment-form';
import { Comment } from '../comment/comment';
import { Link } from '../link/link';
import { LIKED_KEY } from '../constants';

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
      })
      .catch(e => {

      });
  }

  like() {
    this.inProgress = true;
    let liked = JSON.parse(localStorage.getItem(LIKED_KEY)) || [];

    if (liked.indexOf(this.state.item._id) !== -1) {
      this.inProgress = false;
      return;
    }

    this.newsService
      .like(this.state.item._id)
      .then(() => {
        liked.push(this.state.item._id);
        localStorage.setItem(LIKED_KEY, JSON.stringify(liked));
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
        return <Comment key={ comment._id } comment={ comment } />
      });

      details = (
        <div>
          <div>
            <Link link={ this.state.item.link } title={ this.state.item.title }/>
          </div>
          <div>
            { btnLike } { this.state.item.likes } Likes, By { this.state.item.nickname }
          </div>
          <div>
            <CommentForm newsId={ this.state.item._id } onSent={ this.onSentNewComment } />
          </div>
          <div>
            { comments }
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