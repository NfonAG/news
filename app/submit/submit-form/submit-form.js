/**
 * Created by Vadym Yatsyuk on 27.08.17
 */
import React from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

import './submit-form.scss';
import { StorageService } from '../../services/storage.service';

class RawSubmitForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        StorageService.nickname = values.nickname;
        this.props.onSubmit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    return (
      <Form onSubmit={ this.handleSubmit } className="submit-form-component">
        <Form.Item label="Title" {...formItemLayout}>
          { getFieldDecorator('title', {
            rules: [{
              required: true, message: 'Title should not be empty!',
            }],
          })(
            <Input type="text" placeholder="Title" />
          ) }
        </Form.Item>
        <Form.Item label="Link" {...formItemLayout}>
          { getFieldDecorator('link', {
            rules: [{
              required: true, message: 'Link should not be empty',
            }, {
              validator: (rule, value, cb) => {
                try {
                  let url = new URL(value);
                } catch (e) {
                  cb('Should be a valid link');
                  return;
                }
                cb();
              }
            }],
          })(
            <Input type="text" placeholder="Link" />
          ) }
        </Form.Item>
        <Form.Item label="Nickname" {...formItemLayout}>
          { getFieldDecorator('nickname', {
            rules: [{
              required: true, message: 'Nickname should not be empty',
            }],
            initialValue: StorageService.nickname || ''
          })(
            <Input type="text" placeholder="Nickname" />
          ) }
        </Form.Item>
        <Form.Item className="actions">
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    )
  }
}

export const SubmitForm = Form.create()(RawSubmitForm);