/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NewsService } from '../news.service';
import { Form, Input, Button } from 'antd';

export class Submit extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      news: {
        link: '',
        title: '',
        nickname: ''
      },
      isSending: false,
      isLoading: false
    };
    this.newsService = new NewsService();

    this.onSubmit = this.onSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(field) {
    return e => {
      this.setState({
        news: Object.assign({}, this.state.news, { [field]: e.target.value })
      });
    };
  }


  createNews(news) {
    this.updateSending(false);

    this.newsService
      .create(news)
      .then(() => {
        this.updateSending(false);
        this.props.history.push('/new');
      });
  }

  updateSending(isSending) {
    this.setState({
      isSending
    });
  }

  onSubmit(e) {
    e.preventDefault();

    this.createNews(this.state.news);
  }

  render() {
    return (
      <div>
        <Form onSubmit={ this.onSubmit }>
          <Form.Item>
            <Input type="text"
                   placeholder="Title"
                   value={ this.state.news.title }
                   onChange={ this.onValueChange('title') }
            />
          </Form.Item>
          <Form.Item>
            <Input type="text"
                   placeholder="Link"
                   value={ this.state.news.link }
                   onChange={ this.onValueChange('link') }
            />
          </Form.Item>
          <Form.Item>
            <Input type="text"
                   placeholder="Nickname"
                   value={ this.state.news.nickname }
                   onChange={ this.onValueChange('nickname') }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}