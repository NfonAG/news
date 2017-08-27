/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon } from 'antd';

import { NewsService } from '../services/news.service';
import './comment-form.scss';
import { StorageService } from '../services/storage.service';

const FormItem = Form.Item;

class RawCommentForm extends React.Component {
  static propTypes = {
    newsId: PropTypes.string,
    commentId: PropTypes.string,
    onSent: PropTypes.func
  };
  constructor() {
    super();

    this.state = {
      isSending: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  set isSending(isSending) {
    this.setState({
      isSending
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.isSending = true;

        NewsService
          .createComment(this.props.newsId, this.props.commentId, values)
          .then((comment) => {
            this.isSending = false;

            this.props.onSent(comment);
          });
      }
    });

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={ this.onSubmit } className="comment-from-component">
        <h6>
          Comment
        </h6>
        <FormItem>
          { getFieldDecorator('nickname', {
            rules: [{
              required: true, message: 'Nickname should not be empty',
            }],
            initialValue: StorageService.nickname || ''
          })(
            <Input type="text"
                   placeholder="Nickname"
                   prefix={<Icon type="user" style={{ fontSize: 13 }} />}
            />
          )}
        </FormItem>
        <FormItem>
          { getFieldDecorator('content', {
            rules: [{
              required: true, message: 'Comment should not be empty',
            }]
          })(
            <Input type="textarea" placeholder="Comment..." />
          )}
        </FormItem>
        <FormItem className="actions">
          <Button type="primary" htmlType="submit">Comment</Button>
        </FormItem>
      </Form>
    )
  }
}

export const CommentForm = Form.create()(RawCommentForm);