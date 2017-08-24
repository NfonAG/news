/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import { NewsService } from '../news.service';

export class Comment extends React.Component {
  constructor() {
    super();

    this.state = {
      isSending: false,
      comment: {
        content: '',
        nickname: ''
      }
    };

    this.newsService = new NewsService();
    this.onSubmit = this.onSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  set isSending(isSending) {
    this.setState({
      isSending
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.isSending = true;

    this.newsService.createComment(this.props.newsId, this.state.comment)
      .then((comment) => {

        this.isSending = false;

        this.props.onSent(comment);
      });
  }

  onValueChange(field) {
    return e => {
      this.setState({
        comment: Object.assign({}, this.state.comment, { [field]: e.target.value })
      });
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.onSubmit }>
          <h6>
            Comment
          </h6>
          <div>
            <input type="text"
                   placeholder="Nickname"
                   value={ this.state.comment.nickname }
                   onChange={ this.onValueChange('nickname') }
            />
          </div>
          <div>
            <textarea cols="30"
                      rows="10"
                      value={ this.state.comment.content }
                      placeholder="Comment..."
                      onChange={ this.onValueChange('content') }
            ></textarea>
          </div>
          <button type="submit">Comment</button>
        </form>
      </div>
    )
  }
}