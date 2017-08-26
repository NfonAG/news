/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon } from 'antd';

import { NewsService } from '../news.service';
const FormItem = Form.Item;

export class CommentForm extends React.Component {
  static propTypes = {
    newsId: PropTypes.string,
    commentId: PropTypes.string,
    onSent: PropTypes.func
  };
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

    this.newsService
      .createComment(this.props.newsId, this.props.commentId, this.state.comment)
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
        <Form onSubmit={ this.onSubmit }>
          <h6>
            Comment
          </h6>
          <FormItem>
            <Input type="text"
                   placeholder="Nickname"
                   value={ this.state.comment.nickname }
                   onChange={ this.onValueChange('nickname') }
                   prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            />
          </FormItem>
          <FormItem>
            <Input type="textarea"
                   value={ this.state.comment.content }
                   placeholder="Comment..."
                   onChange={ this.onValueChange('content') }
            />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">Comment</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}