/**
 * Created by Vadym Yatsyuk on 25.08.17
 */

import React from 'react';
import PropTypes from 'prop-types'
import { CommentForm } from '../comment-form/comment-form';

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
      newComment: Object.assign({} ,comment)
    });
  }

  render() {
    let commentForm = '';
    let newComment = '';
    let replyButton = '';


    if (!this.props.comment.parentComment) {
      replyButton = <div><button type="button" onClick={ this.reply.bind(this) }>Reply</button></div>;
    }

    if (this.state.isReplyShown) {
      commentForm = <CommentForm newsId={ this.props.comment.news } onSent={ this.onSent } />
    }

    if (this.state.newComment) {
      newComment = <div><Comment comment={ this.state.newComment }/></div>;
    }

    let comments = this.props.comment.comments.map(comment => {
      return <Comment key={ comment._id } comment={ comment }/>
    });

    if (comments.length) {
      comments = <div>{ comments }</div>
    }

    return (
      <div>
        <div>
          { this.props.comment.nickname } { this.props.comment.createdAt }
        </div>
        <div>
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