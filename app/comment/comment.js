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
      newComments: []
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
      newComments: [...this.state.newComments, comment]
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

  getComments() {
    let comments = null;

    if (this.props.comment && this.props.comment.comments && this.props.comment.comments.length) {
      comments = this.props.comment.comments.map(comment => {
        return <Comment key={ comment._id } comment={ comment }/>
      });
      comments = <div className="replies">{ comments }</div>
    }

    return comments;
  }

  getNewComments() {
    let newComments = null;

    if (this.state.newComments.length) {
      newComments = this.state.newComments.map(newComment => {
        return <Comment key={ newComment._id } comment={ newComment }/>;
      });

      newComments = <div className="replies">{ newComments }</div>;
    }

    return newComments;
  }

  getCommentForm() {
    if (!this.state.isReplyShown) {
      return null;
    }

    return <CommentForm newsId={ this.props.comment.news } commentId={ this.props.comment._id } onSent={ this.onSent } />
  }

  getReplyButton() {
    if (this.props.comment.parentComment) {
      return null;
    }

    return (
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

  render() {

    return (
      <div className="comment-component">
        <div className="details">
          { this.props.comment.nickname }, { this.getDate() }
        </div>
        <div className="content">
          { this.props.comment.content }
        </div>
        { this.getReplyButton() }
        { this.getCommentForm() }
        { this.getComments() }
        { this.getNewComments() }
      </div>
    );
  }
}