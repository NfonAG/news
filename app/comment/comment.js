/**
 * Created by Vadym Yatsyuk on 25.08.17
 */

import React from 'react';
import PropTypes from 'prop-types'
import { CommentForm } from '../comment-form/comment-form';
import moment from 'moment';

import './comment.scss';

export class Comment extends React.Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      isReplyShown: false,
      newComment: null
    };

    this.reply = this.reply.bind(this);
    this.onSent = this.onSent.bind(this);
  }

  set isReplyShown(isReplyShown) {
    this.setState({
      isReplyShown
    });
  }

  reply() {
    this.isReplyShown = !this.state.isReplyShown;
  }

  onSent(comment) {
    this.setState({
      newComment: Object.assign({}, comment)
    });
    this.isReplyShown = false;
  }

  getDate() {
    let date = moment(this.props.comment.createdAt);

    if (Math.abs(date.diff()) > 1000 * 60 * 60 * 24) {
      date = date.format("H:mm, Do MMMM YYYY");
    } else {
      date = date.fromNow();
    }

    return date;
  }

  render() {
    let commentForm = '';
    let newComment = '';
    let replyButton = '';


    if (!this.props.comment.parentComment) {
      replyButton = (
        <div>
          <button type="button"
                  onClick={ this.reply.bind(this) }
                  className="reply-btn"
          >
            Reply
          </button>
        </div>
      );
    }

    if (this.state.isReplyShown) {
      commentForm = <CommentForm newsId={ this.props.comment.news } commentId={ this.props.comment._id } onSent={ this.onSent } />
    }

    if (this.state.newComment) {
      newComment = <div><Comment comment={ this.state.newComment }/></div>;
    }

    let comments = null;

    if (this.props.comment && this.props.comment.comments && this.props.comment.comments.length) {
      comments = this.props.comment.comments.map(comment => {
        return <Comment key={ comment._id } comment={ comment }/>
      });
      comments = <div className="replies">{ comments }</div>
    }

    return (
      <div className="comment-component">
        <div className="details">
          { this.props.comment.nickname }, { this.getDate() }
        </div>
        <div className="content">
          { this.props.comment.content }
        </div>
        { replyButton }
        { commentForm }
        { newComment }
        { comments }
      </div>
    );
  }
}